import React, { useState } from 'react'
import { useSelector, useDispatch } from 'react-redux'
import { Form, FormGroup, Label, Input, Button, Col, Progress } from 'reactstrap'
import { CKEditor } from '@ckeditor/ckeditor5-react'
import ClassicEditor from '@ckeditor/ckeditor5-editor-classic/src/classiceditor'
import { editorConfiguration } from '../../components/editor/EditorConfig'
import Myinit from '../../components/editor/UploadAdapter'
import { POST_UPLOADING_REQUEST } from '../../redux/types'
import dotenv from 'dotenv'

dotenv.config()

const PostWrite = () => {
  const { isAuthenticated } = useSelector((state) => state.auth)
  const [form, setValues] = useState({ title: '', contents: '', fileUrl: '' })
  const dispatch = useDispatch()

  const onSubmit = async (e) => {
    await e.preventDefault()
    const { title, contents, fileUrl, category } = form
    const token = localStorage.getItem('token')
    const body = { title, contents, fileUrl, category, token }
    dispatch({
      type: POST_UPLOADING_REQUEST,
      payload: body
    })
  }

  // react에서 form을 쓰려면 반드시 onChange가 필요하다.
  const onChange = (e) => {
    setValues({
      ...form,
      [e.target.name]: e.target.value
    })
  }

  const getDataFromCKEditor = (event, editor) => {
    const data = editor.getData() // CKEditor의 인스턴스에 올려진 메모리에 접근 -> html 형식으로 출력

    if (data && data.match('<img src=')) {
      const whereImg_start = data.indexOf('<img src=')
      console.log(whereImg_start)
      let whereImg_end = ''
      let ext_name_find = ''
      let result_Img_Url = ''
      const ext_name = ['jpeg', 'png', 'jpg', 'gif'] // 확장자

      for (let i = 0; i < ext_name.length; i++) {
        if (data.match(ext_name[i])) {
          console.log(data.indexOf(`${ext_name[i]}`))
          ext_name_find = ext_name[i] // 확장자를 찾음
          whereImg_end = data.indexOf(`${ext_name[i]}`) // 확장자 명의 위치 저장
        }
      }
      console.log(ext_name_find)
      console.log(whereImg_end)

      if (ext_name_find === 'jpeg') { // 4글자
        result_Img_Url = data.substring(whereImg_start + 10, whereImg_end + 4)
      } else { // 3글자
        result_Img_Url = data.substring(whereImg_start + 10, whereImg_end + 3)
      }

      console.log(result_Img_Url, 'result_Img_Url')

      setValues({
        ...form,
        fileUrl: result_Img_Url,
        contents: data
      })
    } else {
      setValues({
        ...form,
        fileUrl: process.env.REACT_APP_BASIC_IMAGE_URL,
        contents: data
      })
    }
  }

  return (
    <div className='post-write-wrap'>
      {isAuthenticated
        ? (
          <Form className='profile-form-flex' onSubmit={onSubmit}>
            <FormGroup className='mb-3'>
              <Label for='title' className='mb-2 post-write-label'>Title</Label>
              <Input type='text' autoComplete='off' name='title' id='title' className='edit-form-style form-control' onChange={onChange} />
            </FormGroup>
            <FormGroup className='mb-3'>
              <Label for='category' className='mb-2 post-write-label'>Category</Label>
              <Input type='text' autoComplete='off' name='category' id='category' className='edit-form-style form-control' onChange={onChange} />
            </FormGroup>
            <FormGroup className='mb-3 content-form-wrap'>
              <Label for='content' className='mb-2 post-write-label'>Content</Label>
              <CKEditor editor={ClassicEditor} config={editorConfiguration} onReady={Myinit} onBlur={getDataFromCKEditor} />
              <Button className='comment-btn'>작성완료</Button>
            </FormGroup>
          </Form>
          )
        : (
          <Col width={50} className='p-5 m-5'>
            <Progress animated color='info' value={100} />
          </Col>
          )}
    </div>
  )
}

export default PostWrite
