import { useEffect, useState } from 'react';
import {
  Select,
  Form,
  Button,
  Input,
  Checkbox,
  Typography,
  Divider,
  List,
} from 'antd';
import { getStockOptions, getStockTable, KeyOption } from '../../api';
import { isNil } from 'lodash';

type FormValue = {
  IDs?: number[];
  stockID?: number;
  mock: boolean;
};

export const Home = () => {
  const [options, setOptions] = useState<KeyOption[]>([]);
  const [fetched, setFetched] = useState(false);
  const [dataSource, setDataSource] = useState<string[]>([]);
  const [stockName, setStockName] = useState('');

  useEffect(() => {
    (async () => {
      try {
        const data = await getStockOptions();
        setOptions(data.data.data);
        setFetched(true);
      } catch {
        setFetched(true);
      }
    })();
  }, []);

  const handleFinish = async (formValue: FormValue) => {
    console.log(formValue);
    const data = await getStockTable({
      stockID: formValue?.stockID as number,
      mock: formValue.mock,
      body: {
        IDs: formValue?.IDs?.length ? formValue.IDs : undefined,
      },
    });

    setDataSource(data.data.data.map((v) => `${v.name}: ${v.value}`));
    setStockName(data.data.name);
  };

  const initValue: FormValue = {
    IDs: undefined,
    stockID: undefined,
    mock: true,
  };

  const [form] = Form.useForm();

  if (!fetched) return <div>loading...</div>;
  return (
    <div style={{ width: 500 }}>
      <Form
        form={form}
        initialValues={initValue}
        onValuesChange={(v) => console.log(v)}
        onFinish={handleFinish}
      >
        <Form.Item label="欄位控制(預設全選)" name="IDs">
          <Select
            mode="multiple"
            allowClear
            style={{ width: '100%' }}
            placeholder="選擇要顯示的欄位"
            options={options.map((v) => ({ label: v.text, value: v.value }))}
          />
        </Form.Item>
        <Form.Item
          name="stockID"
          label="股票編號"
          tooltip={{ title: '目前只支援輸入編號的功能' }}
          normalize={(v: string) => {
            if (!v.trim().length) return undefined;
            return Number.isNaN(+v) ? undefined : +v;
          }}
          rules={[
            {
              type: 'string',
              validator: (_, v) => {
                if (isNil(v)) return Promise.reject();
                if (Number.isNaN(+v)) return Promise.reject();
                return Promise.resolve();
              },
              message: '請輸入有效的股票編號',
            },
          ]}
        >
          <Input placeholder="輸入股票編號" />
        </Form.Item>
        <Form.Item name="mock" valuePropName="checked">
          <Checkbox>使用測試資料(主要用來測試功能是否正常)</Checkbox>
        </Form.Item>
        <Form.Item>
          <Button type="primary" htmlType="submit">
            送出
          </Button>
        </Form.Item>
      </Form>
      <Divider orientation="left">股票資訊</Divider>
      {stockName ? (
        <List
          header={<Typography.Text mark>{stockName}</Typography.Text>}
          bordered
          dataSource={dataSource}
          renderItem={(item) => <List.Item>{item}</List.Item>}
        />
      ) : (
        <div></div>
      )}
    </div>
  );
};
