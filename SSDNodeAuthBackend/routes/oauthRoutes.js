const express = require('express');
const router = express.Router();
const {google} = require('googleapis');
const credentials = require('../credentials.json');

const client_id = credentials.web.client_id;
const client_secret = credentials.web.client_secret;
const redirect_uris = credentials.web.redirect_uris;
const oAuth2Client = new google.auth.OAuth2(client_id, client_secret, redirect_uris[0]);

const SCOPE = ['https://www.googleapis.com/auth/userinfo.profile https://www.googleapis.com/auth/drive.file']

router.get('/getAuthURL', (req, res) => {
    const authUrl = oAuth2Client.generateAuthUrl({
        access_type: 'offline',
        scope: SCOPE,
    });
    return res.send(authUrl);
});

router.post('/getToken', (req, res) => {
    if (req.body.code == null) return res.status(400).send('Invalid Request');
    oAuth2Client.getToken(req.body.code, (err, token) => {
        if (err) {
            return res.status(400).send('Error retrieving access token');
        }
        res.send(token);
    });
});

router.post('/getUserInfo', (req, res) => {
    let token = JSON.parse(req.headers['authorization'])
    oAuth2Client.setCredentials(token);
    const oauth2 = google.oauth2({version: 'v2', auth: oAuth2Client});
    oauth2.userinfo.get((err, response) => {
        if (err) res.status(400).send(err);
        res.send(response.data);
    })
});

router.get('/readDrive', (req, res) => {
    let token = JSON.parse(req.headers['authorization'])
    oAuth2Client.setCredentials(token);
    const drive = google.drive({version: 'v3', auth: oAuth2Client});
    drive.files.list({
        pageSize: 10
    }, (err, response) => {
        if (err) {
            return res.status(400).send("You didnt give permission for this app to view files.");
        }
        const files = response.data.files;
        res.send(files);
    });
});

router.get('/thumbnail/:id', (req, res) => {
    let token = JSON.parse(req.headers['authorization'])
    oAuth2Client.setCredentials(token);
    const drive = google.drive({version: 'v3', auth: oAuth2Client});
    var fileId = req.params.id;
    drive.files.get({
        fileId: fileId,
        fields: "thumbnailLink"
    }).then((response) => {
        console.log(response.data)
        res.send(response.data)
    })
});

router.post('/fileUpload', (req, res) => {
    var form = new formidable.IncomingForm();
    let token = JSON.parse(req.headers['authorization'])
    form.parse(req, (err, fields, files) => {
        if (err) return res.status(400).send(err);
        if (token == null) return res.status(400).send('Token not found');
        oAuth2Client.setCredentials(token);
        const drive = google.drive({version: "v3", auth: oAuth2Client});
        const fileMetadata = {
            name: files.file.name,
        };
        const media = {
            mimeType: files.file.type,
            body: fs.createReadStream(files.file.path),
        };
        drive.files.create(
            {
                resource: fileMetadata,
                media: media,
                fields: "id",
            },
            (err, file) => {
                oAuth2Client.setCredentials(null);
                if (err) {
                    res.status(400).send("You didn't gave permission for upload files to Google drive")
                } else {
                    res.send('Successful')
                }
            }
        );
    });
});

router.post('/download/:id', (req, res) => {
    let token = JSON.parse(req.headers['authorization'])
    oAuth2Client.setCredentials(token);
    const drive = google.drive({version: 'v3', auth: oAuth2Client});
    var fileId = req.params.id;
    drive.files.get(
        {fileId: fileId, alt: "media",},
        {responseType: "stream"},
        (err, {data}) => {
            if (err) {
                console.log('myErrror')
                console.log(err);
                return;
            }else{
                let buf = [];
                data.on("data", (e) => buf.push(e));
                data.on("end", () => {
                    const buffer = Buffer.concat(buf);
                    console.log(buffer);
                    res.send(buffer.toString('base64'))
                });
            }

        }
    )
});

router.delete('/deleteFile/:id', (req, res) => {
    let token = JSON.parse(req.headers['authorization'])
    oAuth2Client.setCredentials(token);
    const drive = google.drive({version: 'v3', auth: oAuth2Client});
    var fileId = req.params.id;
    drive.files.delete({'fileId': fileId}).then((response) => {
        res.send(response.data)
    }).catch(err=>{
        res.status(400).send("You didn't gave permission for delete files in Google drive")
    })
});

module.exports = router;