import React, { useState } from 'react';
import { Form, Button, Input, DatePicker, Select } from 'antd';
import { AiOutlineLoading3Quarters } from 'react-icons/ai';
import { useNavigate } from 'react-router-dom';
import { useGetTourQuery } from '../../../../api/TourApi';
import { useAddLichTrinhMutation, useRemoveLichTrinhMutation } from '../../../../api/LichTrinhApi';
import { ILichTrinh } from '../../../../interface/lichtrinh';

const { Option } = Select;

type FieldType = {
  id: number;
  tieu_de: string;
  noi_dung: string;
  thoi_gian: string;
  id_tour: number;
};

const Admin_LichtrinhADD: React.FC = () => {
  const navigate = useNavigate();
  const { data: tourdata } = useGetTourQuery();
  const tourArrary = tourdata?.data || [];
  const [addLichTrinh] = useAddLichTrinhMutation();
  const [loading, setLoading] = useState(false);
  const [errors, setErrors] = useState(null);
  const onFinish = (values: ILichTrinh) => {
    addLichTrinh(values)
      .unwrap()
      .then(() => navigate("/admin/tour/lich_trinh"))
      .catch((error) => {
        setErrors(error.data.message);
        setLoading(false);

      });
  };

  return (
    <div className="container">
      <header className="mb-4">
        <h2 className="font-bold text-2xl">Tạo mới lịch trình </h2>
      </header>
      <Form
        className="tour-form"
        name="basic"
        labelCol={{ span: 8 }}
        wrapperCol={{ span: 16 }}
        style={{ maxWidth: 600 }}
        onFinish={onFinish}
        autoComplete="off"
      >
        <Form.Item
          label="Tiêu đề"
          name="tieu_de"
          rules={[
            { required: true, message: 'Vui lòng nhập tiêu đề ' },
            { min: 3, message: 'Tiêu đề tour ít nhất 3 ký tự' },
          ]}
        >
          <Input />
        </Form.Item>
        <Form.Item
          label="Nội dung"
          name="noi_dung"
          rules={[
            { required: true, message: 'Vui lòng nhập nội dung' },
            { min: 3, message: 'Nội dung ít nhất 3 ký tự' },
          ]}
        >
          <Input />
        </Form.Item>
        <Form.Item
          label="Thời gian"
          name="thoi_gian"
          rules={[{ required: true, message: 'Vui lòng chọn thời gian!' }]}
        >
          <DatePicker style={{ width: '100%' }} />
        </Form.Item>
        <Form.Item
          label="ID Tour"
          name="id_tour"
          rules={[{ required: true, message: 'Vui lòng chọn ID Tour!' }]}
        >
          <Select defaultValue="Chọn" style={{ width: 400, }}>
            {tourArrary.map((option) => (
              <Option key={option.id} value={option.id}>{option.ten_tour}</Option>
            ))}
          </Select>
        </Form.Item>
        <Form.Item wrapperCol={{ offset: 8, span: 16 }}>
          <Button type="primary" htmlType="submit">
            Thêm
          </Button>
          <Button
            type="default"
            className="ml-2"
            onClick={() => navigate('/admin/tour/lich_trinh')}
          >
            Quay lại
          </Button>
        </Form.Item>
      </Form>
    </div>
  );
};

export default Admin_LichtrinhADD;
