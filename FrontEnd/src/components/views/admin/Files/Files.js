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
import { getThumbnail, readGDriveFiles} from "../../../services/file.service";
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
            driveFilesArray: [],
            permissionMessageForReadFiles: ''
        };
        this.onchangeFile = this.onchangeFile.bind(this);
        this.removePhoto = this.removePhoto.bind(this);

        //load dive files
        this.loadDriveFiles = this.loadDriveFiles.bind(this)

        //load GDrive files to table
        this.loadDriveFiles()
    }


    toggle = nr => () => {
        let modalNumber = 'modal' + nr
        this.setState({
            [modalNumber]: !this.state[modalNumber]
        });
    }

    onchangeFile(e) {

        if (e.target.files.length) {
            this.setState({
                image: e.target.files[0],
                imageUrl: URL.createObjectURL(e.target.files[0]),
                imageURLValidation: true,
                imageValidation: false,
                imageName: e.target.files[0].name
            });
        }
    }

    removePhoto() {
        this.setState({
            image: ' ',
            imageUrl: ' ',
            imageURLValidation: false,
            imageValidation: false,
            imageName: ' '
        })

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
                    this.setState({
                        driveFilesArray: res.data
                    })
                })
            }
        }).catch(err => {
            if (err.status === 400)
                this.setState({permissionMessageForReadFiles: err.data})
        });
    }

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
                                        <MDBBtn color="primary" onClick={this.toggle(2)} >New</MDBBtn>
                                    </MDBCol>
                                </MDBRow>
                            </MDBCardHeader>
                        </MDBCard>
                    </MDBCol>
                </MDBRow>
                <MDBRow>
                    <MDBCol md="4">
                        <MDBCard style={{ maxWidth: "18rem" }}>
                            <MDBCardImage className="img-fluid" src="https://mdbootstrap.com/img/Mockups/Lightbox/Thumbnail/img%20(67).jpg"
                                          waves />
                            <MDBCardBody>
                                <MDBCardTitle>Card title</MDBCardTitle>
                                <MDBCardText>
                                    Some quick example text to build on the card title and make
                                    up the bulk of the card&apos;s content.
                                </MDBCardText>
                                <MDBRow>
                                    <MDBCol md="5" className="justify-content-center">
                                    </MDBCol>
                                    <MDBCol md="2" >
                                        <MDBBtn floating>Readmore</MDBBtn>
                                    </MDBCol>
                                </MDBRow>
                                <MDBRow>
                                    <MDBCol md='12' className='d-flex justify-content-center'>
                                        <MDBBtn  floating color='primary'>
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
                        <MDBCard style={{ maxWidth: "18rem" }}>
                            <MDBCardImage className="img-fluid" src="https://mdbootstrap.com/img/Mockups/Lightbox/Thumbnail/img%20(67).jpg"
                                          waves />
                            <MDBCardBody>
                                <MDBCardTitle>Card title</MDBCardTitle>
                                <MDBCardText>
                                    Some quick example text to build on the card title and make
                                    up the bulk of the card&apos;s content.
                                </MDBCardText>
                                <MDBRow>
                                    <MDBCol md="5" className="justify-content-center">
                                    </MDBCol>
                                    <MDBCol md="2" >
                                        <MDBBtn floating>Readmore</MDBBtn>
                                    </MDBCol>
                                </MDBRow>
                                <MDBRow>
                                    <MDBCol md='12' className='d-flex justify-content-center'>
                                        <MDBBtn  floating color='primary'>
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
                        <MDBCard style={{ maxWidth: "18rem" }}>
                            <MDBCardImage className="img-fluid" src="https://mdbootstrap.com/img/Mockups/Lightbox/Thumbnail/img%20(67).jpg"
                                          waves />
                            <MDBCardBody>
                                <MDBCardTitle>Card title</MDBCardTitle>
                                <MDBCardText>
                                    Some quick example text to build on the card title and make
                                    up the bulk of the card&apos;s content.
                                </MDBCardText>
                                <MDBRow>
                                    <MDBCol md="5" className="justify-content-center">
                                    </MDBCol>
                                    <MDBCol md="2" >
                                        <MDBBtn floating>Readmore</MDBBtn>
                                    </MDBCol>
                                </MDBRow>
                                <MDBRow>
                                    <MDBCol md='12' className='d-flex justify-content-center'>
                                        <MDBBtn  floating color='primary'>
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
                                        <input type="text" id="defaultFormContactNameEx" className="form-control" />

                                        <label htmlFor="defaultFormContactMessageEx" className="grey-text">
                                            Description
                                        </label>
                                        <textarea type="text" id="defaultFormContactMessageEx" className="form-control" rows="6" />
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
                                                Choose file
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

