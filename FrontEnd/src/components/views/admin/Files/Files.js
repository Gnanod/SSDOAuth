import React, {Component} from 'react';
import './Files.css'
import {
    MDBBtn,
    MDBCard,
    MDBCardBody,
    MDBCardHeader,
    MDBCardImage,
    MDBCardText,
    MDBCardTitle,
    MDBCol,
    MDBContainer,
    MDBIcon,
    MDBModal,
    MDBModalBody,
    MDBModalFooter,
    MDBModalHeader,
    MDBRow
} from "mdbreact";
import "react-datepicker/dist/react-datepicker.css";

export class Files extends Component {


    constructor(props) {
        super(props);
        this.state = {
            modal2: false,
            image: '',
            imageUrl: '',
            imageURLValidation: false,
            imageValidation: false,
            imageName: '',
            name: '',
            fileType: '',
            file: '',
            isSaved: false,
            driveFilesArray: [],
            permissionMessageForReadFiles: ''
        };
        this.onchangeFile = this.onchangeFile.bind(this);
        this.removePhoto = this.removePhoto.bind(this);

        //load dive files
        this.loadDriveFiles = this.loadDriveFiles.bind(this)

        //load GDrive files to table
        this.loadDriveFiles()

        //delete File
        this.deleteDocument = this.deleteDocument.bind(this)
    }

    toggle = nr => () => {
        let modalNumber = 'modal' + nr
        this.setState({
            [modalNumber]: !this.state[modalNumber]
        });
    }

    onchangeFile(e) {
        let url = ""
        if (e.target.files.length) {
            if (e.target.files[0].type === 'application/pdf') {
                url = PdfImage
            } else if (e.target.files[0].type === 'text/html') {
                url = htmlIcon
            } else if (e.target.files[0].type === 'application/vnd.openxmlformats-officedocument.wordprocessingml.document') {
                url = word_icon
            } else if (e.target.files[0].type === 'application/vnd.openxmlformats-officedocument.presentationml.presentation') {
                url = powerpoint_icon
            } else if (e.target.files[0].type === 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet') {
                url = excelIcon
            } else if (e.target.files[0].type === 'image/jpeg' || e.target.files[0].type === 'image/png') {
                url = URL.createObjectURL(e.target.files[0])
            } else if (e.target.files[0].type === 'text/plain') {
                url = notepadIcon
            } else {
                url = unknownFile
            }
            this.setState({
                image: e.target.files[0],
                fileType: e.target.files[0].type,
                imageUrl: url,
                imageURLValidation: true,
                imageValidation: false,
                imageName: e.target.files[0].name,
            });
        }
    }

    removePhoto() {
        this.setState({
            image: ' ',
            imageUrl: ' ',
            imageURLValidation: false,
            imageValidation: false,
            imageName: ' ',
            file: ''
        })
        document.getElementById("inputGroupFile01").value = null
    }

    //load drive files
    loadDriveFiles() {
        readGDriveFiles().then(res => {
            if (res.status === 200) {
                let files = [];
                res.data.map(data => {
                    console.log("data id")
                    console.log(data.id)
                    console.log("data id")
                    getThumbnail(data.id).then(res => {
                        let thumbnail = ''
                        if (Object.keys(res.data).length === 0 && res.data.constructor === Object) {
                            thumbnail = unknownFile
                        } else {
                            thumbnail = res.data.thumbnailLink
                        }

                        const imageData = {
                            "name": data.name,
                            "type": data.mimeType,
                            "thumbnail": thumbnail,
                            "id": data.id
                        }
                        files.push(imageData)
                        this.setState({
                            driveFilesArray: files
                        })
                    })
                })
            }
        }).catch(err => {
            if (err.status === 400)
                this.setState({permissionMessageForReadFiles: err.data})
        });
    }

    //Download files
    downloadFile(id, name, type) {
        // downloadFiles("1KkTHYOx3EyiO3OL7HpXEmswue3s2ZAiS",token).then(res => {
        downloadFiles(id).then(res => {
                if (res.status === 200) {
                    //download as a file
                    const linkSource = 'data:' + type + ';base64,' + res.data;
                    const downloadLink = document.createElement("a");
                    const fileName = name;
                    downloadLink.href = linkSource;
                    downloadLink.download = fileName;
                    downloadLink.click();
                }
            }
        )
    }

    deleteDocument(id, name) {
        swal({
            title: "Are you sure?",
            text: "Once deleted, you will not be able to recover this imaginary file!",
            icon: "warning",
            buttons: true,
            dangerMode: true,
        }).then((willDelete) => {
            if (willDelete) {
                deleteFile(id).then(res => {
                    if (res.status === 200) {
                        Swal.fire(
                            '',
                            name + ' is Successfully Deleted',
                            'success'
                        )
                        this.loadDriveFiles()
                    }
                }).catch(error => {
                    if (error.status === 400) {
                        Swal.fire(
                            '',
                            error.data,
                            'error'
                        )
                    }
                })
            } else {
                swal("Your record is safe!");
            }
        });
    }

    //save Blog
    submitHandler = event => {
        event.preventDefault();
        //append data to formData type object
        let formData = new FormData();
        formData.append('file', this.state.image);
        this.setState({
            isSaved: true
        })
        // call AddFile method in file service
        uploadFile(formData).then(res => {
            console.log(res.data)
            if (res.data === 'Successful') {
                this.setState({
                    name: '',
                    description: '',
                    image: ' ',
                    imageUrl: ' ',
                    imageURLValidation: false,
                    imageValidation: false,
                    imageName: ' ',
                    isSaved: false,
                    modal2: false
                })
                Swal.fire(
                    '',
                    'Added Success',
                    'success'
                )
                this.loadDriveFiles()
            } else {
                this.setState({
                    isSaved: false
                })
                Swal.fire(
                    '',
                    'Added fail',
                    'error'
                )
            }
        }).catch(error => {
            if (error.status === 400) {
                Swal.fire(
                    '',
                    error.data,
                    'error'
                )
                this.setState({
                    isSaved: false
                })
            }
        })
    };

    render() {
        return (
            <MDBContainer>
                <MDBRow>
                    <MDBCol md="12">
                        <MDBCard className="mb-4">
                            <MDBCardHeader>
                                <MDBRow>
                                    <MDBCol md="10">
                                        <p className="h3-responsive text-left mb-4">Blogs</p>
                                    </MDBCol>
                                    <MDBCol md="2">
                                        <MDBBtn color="primary" onClick={this.toggle(2)}>New</MDBBtn>
                                    </MDBCol>
                                </MDBRow>
                            </MDBCardHeader>
                        </MDBCard>
                    </MDBCol>
                </MDBRow>
                <MDBRow>
                    <MDBCol md="12">
                        <MDBCard>
                            <MDBCardBody>
                                <table className="table">
                                    <thead>
                                    <tr>
                                        <th scope="col">Thumbnail</th>
                                        <th scope="col">Name</th>
                                        <th scope="col"></th>
                                    </tr>
                                    </thead>
                                    <tbody>
                                    {
                                        this.state.driveFilesArray.length !== 0 ?
                                            this.state.driveFilesArray.map(data => {
                                                return (<tr>
                                                    <th scope="row">
                                                        <a target="_blank" href={data.thumbnail}>
                                                            <img
                                                                src={data.thumbnail}
                                                                className="card-img-top"
                                                                alt="..."
                                                            />
                                                        </a>
                                                    </th>
                                                    <td>{data.name}</td>
                                                    <td>
                                                        <button type="button" className="btn btn-secondary"
                                                                onClick={() => this.downloadFile(data.id, data.name, data.type)}>Download
                                                        </button>
                                                        <button type="button" className="btn btn-danger"
                                                                onClick={() => this.deleteDocument(data.id, data.name)}>Delete
                                                        </button>
                                                    </td>
                                                </tr>)
                                            })
                                            : <tr>
                                                <td colSpan="2">
                                                    {
                                                        this.state.permissionMessageForReadFiles !== '' ?
                                                            <MDBAlert color="danger">
                                                                {this.state.permissionMessageForReadFiles}
                                                            </MDBAlert>
                                                            :
                                                            <MDBAlert color="danger">
                                                                No Files In Google Drive
                                                            </MDBAlert>
                                                    }

                                                </td>
                                            </tr>
                                    }

                                    </tbody>
                                </table>
                            </MDBCardBody>
                        </MDBCard>
                    </MDBCol>
                    <MDBCol md="4">
                        <MDBCard style={{maxWidth: "18rem"}}>
                            <MDBCardImage className="img-fluid"
                                          src="https://mdbootstrap.com/img/Mockups/Lightbox/Thumbnail/img%20(67).jpg"
                                          waves/>
                            <MDBCardBody>
                                <MDBCardTitle>Card title</MDBCardTitle>
                                <MDBCardText>
                                    Some quick example text to build on the card title and make
                                    up the bulk of the card&apos;s content.
                                </MDBCardText>
                                <MDBRow>
                                    <MDBCol md="5" className="justify-content-center">
                                    </MDBCol>
                                    <MDBCol md="2">
                                        <MDBBtn floating>Readmore</MDBBtn>
                                    </MDBCol>
                                </MDBRow>
                                <MDBRow>
                                    <MDBCol md='12' className='d-flex justify-content-center'>
                                        <MDBBtn floating color='primary'>
                                            <MDBIcon size='lg' fab icon='facebook-f'></MDBIcon>
                                        </MDBBtn>

                                        <MDBBtn rounded floating color='primary'>
                                            <MDBIcon size='lg' fab icon='twitter'></MDBIcon>
                                        </MDBBtn>

                                        <MDBBtn rounded floating color='primary'>
                                            <MDBIcon size='lg' fab icon='dribbble'></MDBIcon>
                                        </MDBBtn>
                                    </MDBCol>
                                </MDBRow>
                            </MDBCardBody>
                        </MDBCard>
                    </MDBCol>
                    <MDBCol md="4">
                        <MDBCard style={{maxWidth: "18rem"}}>
                            <MDBCardImage className="img-fluid"
                                          src="https://mdbootstrap.com/img/Mockups/Lightbox/Thumbnail/img%20(67).jpg"
                                          waves/>
                            <MDBCardBody>
                                <MDBCardTitle>Card title</MDBCardTitle>
                                <MDBCardText>
                                    Some quick example text to build on the card title and make
                                    up the bulk of the card&apos;s content.
                                </MDBCardText>
                                <MDBRow>
                                    <MDBCol md="5" className="justify-content-center">
                                    </MDBCol>
                                    <MDBCol md="2">
                                        <MDBBtn floating>Readmore</MDBBtn>
                                    </MDBCol>
                                </MDBRow>
                                <MDBRow>
                                    <MDBCol md='12' className='d-flex justify-content-center'>
                                        <MDBBtn floating color='primary'>
                                            <MDBIcon size='lg' fab icon='facebook-f'></MDBIcon>
                                        </MDBBtn>

                                        <MDBBtn rounded floating color='primary'>
                                            <MDBIcon size='lg' fab icon='twitter'></MDBIcon>
                                        </MDBBtn>

                                        <MDBBtn rounded floating color='primary'>
                                            <MDBIcon size='lg' fab icon='dribbble'></MDBIcon>
                                        </MDBBtn>
                                    </MDBCol>
                                </MDBRow>
                            </MDBCardBody>
                        </MDBCard>
                    </MDBCol>
                </MDBRow>


                <MDBModal isOpen={this.state.modal2} toggle={this.toggle(2)} size="lg">
                    <MDBModalHeader toggle={this.toggle(2)}>New Blog</MDBModalHeader>
                    <MDBModalBody>
                        <MDBContainer>
                            <MDBRow>
                                <MDBCol md="12">
                                    <form>
                                        <label htmlFor="defaultFormContactNameEx" className="grey-text">
                                            Name Of the blog Post
                                        </label>
                                        <input type="text" id="defaultFormContactNameEx" className="form-control"/>

                                        <label htmlFor="defaultFormContactMessageEx" className="grey-text">
                                            Description
                                        </label>
                                        <textarea type="text" id="defaultFormContactMessageEx" className="form-control"
                                                  rows="6"/>
                                        <br/>
                                        <MDBRow>
                                            <MDBCol size="4">
                                                {
                                                    this.state.imageURLValidation ?
                                                        <MDBCol style={{maxWidth: "14rem"}}>
                                                            <MDBCard>
                                                                <MDBCardImage className="img-fluid "
                                                                              src={this.state.imageUrl}
                                                                              waves/>
                                                            </MDBCard>
                                                        </MDBCol>

                                                        : ''
                                                }

                                                {
                                                    this.state.imageURLValidation ?
                                                        <button className="btnClass"
                                                                onClick={this.removePhoto}>Remove</button> : ''
                                                }

                                            </MDBCol>

                                        </MDBRow>
                                        <br/>
                                        <label htmlFor="defaultFormContactMessageEx" className="grey-text">
                                            Image
                                        </label>
                                        <div className="custom-file">
                                            <input
                                                type="file"
                                                className="custom-file-input"
                                                id="inputGroupFile01"
                                                aria-describedby="inputGroupFileAddon01"
                                                onChange={this.onchangeFile}
                                            />
                                            <label className="custom-file-label" htmlFor="inputGroupFile01">
                                                {
                                                    this.state.imageURLValidation ?
                                                        this.state.imageName :
                                                        "Upload File"
                                                }
                                            </label>
                                        </div>
                                    </form>
                                </MDBCol>
                            </MDBRow>
                        </MDBContainer>
                    </MDBModalBody>
                    <MDBModalFooter>
                        <MDBBtn color="secondary" onClick={this.toggle(2)}>Close</MDBBtn>
                        <MDBBtn color="primary">Save</MDBBtn>
                    </MDBModalFooter>
                </MDBModal>

            </MDBContainer>


        );
    }

}

