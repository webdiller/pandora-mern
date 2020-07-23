import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { Aside } from '../../components';
import Select from 'react-dropdown-select';
import './Profile.sass';

export default function Profile() {

  const [formData, setFormData] = useState({
    title: '',
    description: '',
    category: '',
  });

  const url = 'http://localhost:3003/service';
  const url2 = 'http://jsonplaceholder.typicode.com/todos';

  const [categories, setCategories] = useState([])

  useEffect(() => {
    const getCategories = async () => {
      try {
        const result = await axios.get('http://localhost:3003/categories');

        let data = [];

        result.data.map(item => {
          data.push({
            value: item.name,
            label: item.name,
          })
        });

        setCategories(data);

      } catch (error) {
        console.error(error);
      }
    }

    getCategories();
  }, [])

  const onChange = e => {
    e.preventDefault();
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    })
  }

  // const handleSubmit = async e => {
  //   e.preventDefault();

  //   try {
  //     const url = 'http://localhost:3003/service';

  //     const newService = {
  //       title: formData.title,
  //       body: formData.description,
  //       categories: formData.category
  //     }

  //     const body = JSON.stringify(newService);

  //     const config = {
  //       headers: {
  //         'Content-Type': 'Application/json'
  //       }
  //     };

  //     const res = await axios.post(url, body, config);
  //     if (res.status === 200) {
  //       console.log(res.data);
  //     }

  //   } catch (error) {
  //     console.log(error.response.data);
  //   }
  // }

  // const handleSubmit = () => {

  //   const newService = {
  //     title: formData.title,
  //     body: formData.description,
  //     categories: formData.category
  //   }

  //   const bodyString = JSON.stringify(newService);

  //   return axios.post('http://localhost:3003/service', {
  //     method: 'POST',
  //     headers: {
  //       Accept: 'application/json',
  //       Authorization: `Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJkYXRhIjp7IiRfXyI6eyJzdHJpY3RNb2RlIjp0cnVlLCJzZWxlY3RlZCI6e30sImdldHRlcnMiOnt9LCJfaWQiOiI1ZjE4MzNlMGQxYzcyYjAwY2MxN2MxMzYiLCJ3YXNQb3B1bGF0ZWQiOmZhbHNlLCJhY3RpdmVQYXRocyI6eyJwYXRocyI6eyJwYXNzd29yZCI6ImluaXQiLCJmdWxsbmFtZSI6ImluaXQiLCJlbWFpbCI6ImluaXQiLCJjb25maXJtZWQiOiJpbml0IiwibGFzdF9zZWVuIjoiaW5pdCIsInJvbGUiOiJpbml0IiwiX2lkIjoiaW5pdCIsImNyZWF0ZWRBdCI6ImluaXQiLCJ1cGRhdGVkQXQiOiJpbml0IiwiY29uZmlybV9oYXNoIjoiaW5pdCIsIl9fdiI6ImluaXQifSwic3RhdGVzIjp7Imlnbm9yZSI6e30sImRlZmF1bHQiOnt9LCJpbml0Ijp7Il9pZCI6dHJ1ZSwiY29uZmlybWVkIjp0cnVlLCJsYXN0X3NlZW4iOnRydWUsInJvbGUiOnRydWUsImVtYWlsIjp0cnVlLCJmdWxsbmFtZSI6dHJ1ZSwicGFzc3dvcmQiOnRydWUsImNyZWF0ZWRBdCI6dHJ1ZSwidXBkYXRlZEF0Ijp0cnVlLCJjb25maXJtX2hhc2giOnRydWUsIl9fdiI6dHJ1ZX0sIm1vZGlmeSI6e30sInJlcXVpcmUiOnt9fSwic3RhdGVOYW1lcyI6WyJyZXF1aXJlIiwibW9kaWZ5IiwiaW5pdCIsImRlZmF1bHQiLCJpZ25vcmUiXX0sInBhdGhzVG9TY29wZXMiOnt9LCJjYWNoZWRSZXF1aXJlZCI6e30sIiRzZXRDYWxsZWQiOnt9LCJlbWl0dGVyIjp7Il9ldmVudHMiOnt9LCJfZXZlbnRzQ291bnQiOjAsIl9tYXhMaXN0ZW5lcnMiOjB9LCIkb3B0aW9ucyI6eyJza2lwSWQiOnRydWUsImlzTmV3IjpmYWxzZSwid2lsbEluaXQiOnRydWV9fSwiaXNOZXciOmZhbHNlLCIkbG9jYWxzIjp7fSwiJG9wIjpudWxsLCJfZG9jIjp7ImNvbmZpcm1lZCI6dHJ1ZSwibGFzdF9zZWVuIjoiMjAyMC0wNy0yMlQxMTo1MTo1NC45NzVaIiwicm9sZSI6MCwiX2lkIjoiNWYxODMzZTBkMWM3MmIwMGNjMTdjMTM2IiwiZW1haWwiOiJldWdlbmVmcm9tcnVzQGdtYWlsLmNvbSIsImZ1bGxuYW1lIjoicXdlcnR5IiwicGFzc3dvcmQiOiIkMmEkMTAkS0psSDdOQ0JCSDEyNlBTUTdpQU9IT2ZUbnR1UVZhZDM0akhUS25MdW85V0g4SWpWZTNPN0siLCJjcmVhdGVkQXQiOiIyMDIwLTA3LTIyVDEyOjQxOjA0LjA1OFoiLCJ1cGRhdGVkQXQiOiIyMDIwLTA3LTIyVDEyOjQxOjQ3LjI5M1oiLCJjb25maXJtX2hhc2giOiIkMmEkMTAkTHp6QnEzanVZRGNQQUZ0Y2J5ZmlzLjVHWTVkWTRiSWYuUm1ZdUticm13NTBkaE9WZG5rRkMiLCJfX3YiOjB9LCIkaW5pdCI6dHJ1ZX0sImlhdCI6MTU5NTQyMTcxMiwiZXhwIjoxNTk2MDI2NTEyfQ.Y-8u99ypzqeus9TpUH-nkJP_kh6W_U1GZH-NL0N4nP8`
  //     },
  //     body: bodyString
  //   })
  //     .then(response => {
  //       return response.json();
  //     })
  //     .catch(err => console.log(err));
  // };

  return (
    <div className="profile">
      <div className="profile__container">
        <Aside />
        <div className="profile__content">

          {/* Навигация по сделкам */}
          <div className='profile__status'>

            <div className="profile__status-item">
              <p className="profile__status-title">Личные сообщения:</p>
              <div className="profile__status-info">
                <div className="profile__status-row">
                  <span className="profile__status-name">Новых</span>
                  <span className="profile__status-value">5</span>
                </div>
                <div className="profile__status-row">
                  <span className="profile__status-name">Всего</span>
                  <span className="profile__status-value">41</span>
                </div>
              </div>
            </div>

            <div className="profile__status-item">
              <p className="profile__status-title">Сделки ожидающие завершения:</p>
              <div className="profile__status-info">
                <button className="profile__status-row">
                  <span className="profile__status-name">Вы исполнитель</span>
                  <span className="profile__status-value">1</span>
                </button>
                <button className="profile__status-row">
                  <span className="profile__status-name">Вы заказчик</span>
                  <span className="profile__status-value">2</span>
                </button>
              </div>
            </div>

            <div className="profile__status-item">
              <p className="profile__status-title">Ваш депозит:</p>
              <div className="profile__status-info">
                <p className="profile__status-deposit">120000 руб</p>
              </div>
            </div>

            <div className="profile__status-item">
              <p className="profile__status-title">Ваш последний вход:</p>
              <div className="profile__status-info">
                <p className="profile__status-date">17 марта 2021 года</p>
              </div>
            </div>

          </div>

          <div className="profile__username">
            <p className="profile__username-title">Публикация услуги</p>
            <form className="profile__form">
              <input onChange={e => { onChange(e) }} name="title" type="text" placeholder="Название" className="profile__username-input" />
              <input onChange={e => { onChange(e) }} name="description" type="text" placeholder="Описание" className="profile__username-input" />
              <Select
                options={categories}
                name="Категории"
                values={[]}
                onChange={(value) => {
                  setFormData({
                    ...formData,
                    category: value[0].value
                  })
                }}
                placeholder="Категории"
                value
              />
              <button onClick={e => {
                e.preventDefault();

                axios.post(url,
                  {
                    title: 'Заголовок услуги 1',
                    body: 'Описание услуги 1',
                    categories: 'Выбранная категория для услуги 1'

                    // title: 'Заголовок услуги 1',
                    // completed: false
                  },
                  {
                    headers: {
                      Accept: 'application/json',
                      'Content-Type': 'application/json',
                      Authorization: `eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJkYXRhIjp7IiRfXyI6eyJzdHJpY3RNb2RlIjp0cnVlLCJzZWxlY3RlZCI6e30sImdldHRlcnMiOnt9LCJfaWQiOiI1ZjE4MzNlMGQxYzcyYjAwY2MxN2MxMzYiLCJ3YXNQb3B1bGF0ZWQiOmZhbHNlLCJhY3RpdmVQYXRocyI6eyJwYXRocyI6eyJwYXNzd29yZCI6ImluaXQiLCJmdWxsbmFtZSI6ImluaXQiLCJlbWFpbCI6ImluaXQiLCJjb25maXJtZWQiOiJpbml0IiwibGFzdF9zZWVuIjoiaW5pdCIsInJvbGUiOiJpbml0IiwiX2lkIjoiaW5pdCIsImNyZWF0ZWRBdCI6ImluaXQiLCJ1cGRhdGVkQXQiOiJpbml0IiwiY29uZmlybV9oYXNoIjoiaW5pdCIsIl9fdiI6ImluaXQifSwic3RhdGVzIjp7Imlnbm9yZSI6e30sImRlZmF1bHQiOnt9LCJpbml0Ijp7Il9pZCI6dHJ1ZSwiY29uZmlybWVkIjp0cnVlLCJsYXN0X3NlZW4iOnRydWUsInJvbGUiOnRydWUsImVtYWlsIjp0cnVlLCJmdWxsbmFtZSI6dHJ1ZSwicGFzc3dvcmQiOnRydWUsImNyZWF0ZWRBdCI6dHJ1ZSwidXBkYXRlZEF0Ijp0cnVlLCJjb25maXJtX2hhc2giOnRydWUsIl9fdiI6dHJ1ZX0sIm1vZGlmeSI6e30sInJlcXVpcmUiOnt9fSwic3RhdGVOYW1lcyI6WyJyZXF1aXJlIiwibW9kaWZ5IiwiaW5pdCIsImRlZmF1bHQiLCJpZ25vcmUiXX0sInBhdGhzVG9TY29wZXMiOnt9LCJjYWNoZWRSZXF1aXJlZCI6e30sIiRzZXRDYWxsZWQiOnt9LCJlbWl0dGVyIjp7Il9ldmVudHMiOnt9LCJfZXZlbnRzQ291bnQiOjAsIl9tYXhMaXN0ZW5lcnMiOjB9LCIkb3B0aW9ucyI6eyJza2lwSWQiOnRydWUsImlzTmV3IjpmYWxzZSwid2lsbEluaXQiOnRydWV9fSwiaXNOZXciOmZhbHNlLCIkbG9jYWxzIjp7fSwiJG9wIjpudWxsLCJfZG9jIjp7ImNvbmZpcm1lZCI6dHJ1ZSwibGFzdF9zZWVuIjoiMjAyMC0wNy0yMlQxMTo1MTo1NC45NzVaIiwicm9sZSI6MCwiX2lkIjoiNWYxODMzZTBkMWM3MmIwMGNjMTdjMTM2IiwiZW1haWwiOiJldWdlbmVmcm9tcnVzQGdtYWlsLmNvbSIsImZ1bGxuYW1lIjoicXdlcnR5IiwicGFzc3dvcmQiOiIkMmEkMTAkS0psSDdOQ0JCSDEyNlBTUTdpQU9IT2ZUbnR1UVZhZDM0akhUS25MdW85V0g4SWpWZTNPN0siLCJjcmVhdGVkQXQiOiIyMDIwLTA3LTIyVDEyOjQxOjA0LjA1OFoiLCJ1cGRhdGVkQXQiOiIyMDIwLTA3LTIyVDEyOjQxOjQ3LjI5M1oiLCJjb25maXJtX2hhc2giOiIkMmEkMTAkTHp6QnEzanVZRGNQQUZ0Y2J5ZmlzLjVHWTVkWTRiSWYuUm1ZdUticm13NTBkaE9WZG5rRkMiLCJfX3YiOjB9LCIkaW5pdCI6dHJ1ZX0sImlhdCI6MTU5NTQyMTcxMiwiZXhwIjoxNTk2MDI2NTEyfQ.Y-8u99ypzqeus9TpUH-nkJP_kh6W_U1GZH-NL0N4nP8`
                    }

                    // headers: {
                    //   'Content-Type': 'application/json',
                    //   Authorization: 'sometoken'
                    // }
                  }
                )
                  .then(res => console.log(res))
                  .catch(err => {
                    if(err.response) {
                      console.log(err.response.data);
                      console.log(err.response.status);
                      console.log(err.response.headers);
                    }
                    if(err.response.status === 404) {
                      console.log('some error');
                    }
                  })

              }} type="submit" className="profile__btn-submit site-btn site-btn_red site-btn_s3">Опубликовать услугу</button>
            </form>
          </div>

          <div className="profile__username">
            <p className="profile__username-title">Имя пользователя</p>
            <div className="profile__username-group">
              <input readOnly defaultValue="user4040" type="text" className="profile__username-input" />
              <span className="profile__username-description">видно всем</span>
            </div>
          </div>

        </div>
      </div>
    </div >
  );
}