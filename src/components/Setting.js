import React, {Component} from 'react';
import ReactAvatarEditor from 'react-avatar-editor';
import Dropzone from 'react-dropzone';
import {connect} from 'react-redux';
import * as actions from '../redux/actions/auth';
import LinkGetTo from './LinkGetTo';
import Modal from 'react-modal';

Modal.setAppElement('#app');

class Setting extends Component {
    state = {
      image: this.props.user.photoURL,
      allowZoomOut: false,
      position: { x: 0.5, y: 0.5 },
      scale: 1,
      rotate: 0,
      borderRadius: 50,
      preview: null,
      width: 300,
      height: 300,
      userName: this.props.user.userName,
      password: '',
      modalIsOpen: false
    }

    componentDidMount(){
      this.setState({
        image: this.props.user.photoURL,
        userName: this.props.user.userName
      })
    }

    handleNewImage = e => {
      // console.log(e.target.files[0]);
      this.setState({ image: e.target.files[0] })
    }
    OnClickHandleNewImage = () => {
      document.getElementById("new-file").click();
    }
    // function dataURLtoFile(dataurl, filename) {
    //     let arr = dataurl.split(','), mime = arr[0].match(/:(.*?);/)[1],
    //         bstr = atob(arr[1]), n = bstr.length, u8arr = new Uint8Array(n);
    //     while(n--){
    //         u8arr[n] = bstr.charCodeAt(n);
    //     }
    //     return new File([u8arr], filename, {type:mime});
    // }

    handleSave = data => {
      const img_b64 = this.editor.getImageScaledToCanvas().toDataURL('image/png');
      // const png = img_b64.split(',')[1];
      const arr = img_b64.split(',');
      const mime = arr[0].match(/:(.*?);/)[1];
      const bstr = atob(arr[1]);
      let n = bstr.length;
      const u8arr = new Uint8Array(n);
      while(n--){
          u8arr[n] = bstr.charCodeAt(n);
      }
      const imageFile = new File([u8arr], this.props.user.uid, {type:mime});
      // console.log(imageFile);

      this.props.fbUpdateImageUrl(imageFile, this.props.user.uid)
      .then(() => {
        this.OnClickOpenModal();
      })

      // console.log(dataURLtoFile(img_b64, this.props.user.uid));
      //
      // const the_file = new File([window.atob(png)],  {type: 'image/png', encoding: 'utf-8'});
      // console.log(the_file);


      // firebase.storage().ref().storageRef.child('images/mountains.jpg');
      // let fr = new FileReader();
      // fr.onload = function ( oFREvent ) {
      //     let v = oFREvent.target.result.split(',')[1]; // encoding is messed up here, so we fix it
      //     v = atob(v);
      //     let good_b64 = btoa(decodeURIComponent(escape(v)));
      //     document.getElementById("uploadPreview").src = "data:image/png;base64," + good_b64;
      // };
      // fr.readAsDataURL(the_file);
      // const rect = this.editor.getCroppingRect()
      // console.log(fr.readAsDataURL(the_file));
      // console.log(rect);

      // this.setState({
      //   preview: {
      //     img,
      //     rect,
      //     scale: this.state.scale,
      //     width: this.state.width,
      //     height: this.state.height,
      //     borderRadius: this.state.borderRadius,
      //   },
      // })
    }

    handleScale = e => {
      const scale = parseFloat(e.target.value)
      this.setState({ scale })
    }

    handleAllowZoomOut = ({ target: { checked: allowZoomOut } }) => {
      this.setState({ allowZoomOut })
    }

    rotateLeft = e => {
      e.preventDefault()

      this.setState({
        rotate: this.state.rotate - 90,
      })
    }

    rotateRight = e => {
      e.preventDefault()
      this.setState({
        rotate: this.state.rotate + 90,
      })
    }

    logCallback(e) {
      // eslint-disable-next-line
      console.log('callback', e)
    }

    setEditorRef = editor => {
      if (editor) this.editor = editor
    }

    handlePositionChange = position => {
      this.setState({ position })
    }

    handleDrop = acceptedFiles => {
      this.setState({ image: acceptedFiles[0] })
    }

    OnChangeUserName = (e) => {
      this.setState({userName: e.target.value});
    }

    OnClickUserName = () => {
      this.props.fbUpdateUserName(this.state.userName, this.props.user.uid)
      .then(() => {
        this.OnClickOpenModal();
      })
    }

    OnChangePassword = (e) => {
      this.setState({password: e.target.value});
    }
    OnClickPassword = () => {
      if(this.state.password){
        this.props.fbUpdatePassword(this.state.password)
        .then(() => {
          this.OnClickOpenModal();
        })
      }
    }
    OnClickOpenModal = () => {
      this.setState({modalIsOpen: true});
    }

    OnClickCloseModal = () => {
      this.setState({modalIsOpen: false});
    }

    render() {
      // console.log(this.props.user.authError);
      return (
        <div className="setting">
          <h1 className="setting__title">Profile Details</h1>
          <h2>Edit Profile Image</h2>
          <Dropzone
            onDrop={this.handleDrop}
            disableClick
            multiple={false}
            className="setting__dropzone"
            style={{ width: this.state.width, height: this.state.height, marginBottom:'70px' }}
          >
            <div>
              <ReactAvatarEditor
                ref={this.setEditorRef}
                scale={parseFloat(this.state.scale)}
                width={this.state.width}
                height={this.state.height}
                position={this.state.position}
                onPositionChange={this.handlePositionChange}
                rotate={parseFloat(this.state.rotate)}
                borderRadius={this.state.width / (100 / this.state.borderRadius)}
                onLoadFailure={this.logCallback.bind(this, 'onLoadFailed')}
                onLoadSuccess={this.logCallback.bind(this, 'onLoadSuccess')}
                onImageReady={this.logCallback.bind(this, 'onImageReady')}
                image={this.state.image}
                className="setting__dropzone__editor-canvas"
              />
            </div>
          </Dropzone>
          <div className="setting__cont setting__cont__newFile">
            <label htmlFor="new-file">New Image:</label>
            <input className="hidden" id="new-file" name="newImage" type="file" onChange={this.handleNewImage} />
            <input type="button" value="Choose File" onClick={this.OnClickHandleNewImage}/>
          </div>
          <div className="setting__cont setting__cont__zoom">
            <label>Zoom:</label>
            <input
              name="scale"
              type="range"
              onChange={this.handleScale}
              min={this.state.allowZoomOut ? '0.1' : '1'}
              max="2"
              step="0.01"
              defaultValue="1"
            />
          </div>
          <div className="setting__cont setting__cont__scale">
            <label>Allow Scale - 1</label>
            <input
              name="allowZoomOut"
              type="checkbox"
              onChange={this.handleAllowZoomOut}
              checked={this.state.allowZoomOut}
            />
          </div>
          <div className="setting__cont setting__cont__rotate">
            <label>Rotate:</label>
            <input type="button" onClick={this.rotateLeft} value="Left" />
            <input type="button" onClick={this.rotateRight} value="Right" />
          </div>
          <div className="setting__cont setting__btn">
            <input type="button" onClick={this.handleSave} value="Update Image" />
          </div>
          <h2>Edit user Name</h2>
          <div className="setting__cont setting__cont__user-name">
            <label>User Name</label>
            <input type="text" onChange={this.OnChangeUserName} value={this.state.userName} />
          </div>
          <div className="setting__cont setting__btn">
            <input type="button" onClick={this.OnClickUserName} value="Update User Name"/>
          </div>
          <h2>Update Password</h2>
          <div className="setting__cont setting__cont__password">
            <label>Password</label>
            <input type="password" onChange={this.OnChangePassword} value={this.state.password} />
          </div>
          <div className="setting__cont setting__btn">
            <input type="button" onClick={this.OnClickPassword} value="Update Password"/>
          </div>
          <LinkGetTo to="/dashboard" icon="fa-arrow-left" />
          <Modal
            isOpen = {this.state.modalIsOpen}
            onRequestClose = {this.OnClickCloseModal}
            className="Modal"
            overlayClassName="Overlay"
            aria={{
              labelledby: "Update",
              describedby: "Update Setting"
            }}>
            <div className="Modal__content">
              <h2>{this.props.user.successful}</h2>
              <p className="error">{this.props.user.authError}</p>
              <button className="Modal__content--no" onClick={this.OnClickCloseModal}>Close</button>
            </div>
          </Modal>
        </div>
      )
    }
}

const mapStateToProps = (state) => {
  return {
    user: state.auth
  }
}

export default connect(mapStateToProps, actions)(Setting);
