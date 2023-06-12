import { useEffect, useState } from 'react';
import { getStockSchedule, setStockSchedule, StockSchedule } from '../../api';
import { Button, Divider, Form, Table, TimePicker } from 'antd';
import TextArea from 'antd/es/input/TextArea';
import { dayjs, TZ } from '../../utils';

const columns = [
  {
    title: '編號',
    dataIndex: 'index',
    key: 'index',
  },
  {
    title: '排程',
    dataIndex: 'cycleTime',
    key: 'cycleTime',
  },
  {
    title: '使用者',
    dataIndex: 'user',
    key: 'user',
  },
  {
    title: '股票編號',
    dataIndex: 'stockIDs',
    key: 'stockIDs',
  },
];

type FormValue = {
  stockIDs: string[];
  dailyTime: string;
};

export const Schedule = () => {
  const [dataSource, setDataSource] = useState<StockSchedule[]>([]);
  const [fetched, setFetched] = useState(false);

  const fetchTable = async () => {
    try {
      const { data } = await getStockSchedule();
      setDataSource(data.data);
      setFetched(true);
    } catch {
      setFetched(true);
    }
  };

  useEffect(() => {
    fetchTable();
  }, []);

  const initialData = {
    stockIDs: undefined,
    dailyTime: undefined,
  };

  const handleFinish = (formValue: FormValue) => {
    setStockSchedule({
      IDs: formValue.stockIDs,
      dailyTime: dayjs(formValue.dailyTime)
        .tz('America/New_York')
        .toISOString(),
    })
      .then(() => {
        alert('新增成功');
        fetchTable();
      })
      .catch(() => alert('新增失敗'));
  };

  if (!fetched) return <div>loading</div>;
  return (
    <div style={{ width: 500 }}>
      <Form initialValues={initialData} onFinish={handleFinish}>
        <Form.Item
          label="編號（用,分隔來多選）"
          name="stockIDs"
          normalize={(v) => {
            if (!v) return undefined;
            return v.split(',');
          }}
          rules={[
            {
              message: '輸入有效的股票編號',
              validator: (_, v?: string[]) => {
                if (!v) return Promise.reject();
                if (v.some((s) => !s || Number.isNaN(Number(s))))
                  return Promise.reject();
                return Promise.resolve();
              },
            },
          ]}
        >
          {/*TODO: 找替代方式*/}
          <TextArea placeholder="輸入股票編號，用,分隔" allowClear />
        </Form.Item>
        <Form.Item label="每日通知時間（時：分）" name="dailyTime">
          <TimePicker format="HH:mm" />
        </Form.Item>
        <Form.Item>
          <Button type="primary" htmlType="submit">
            送出
          </Button>
        </Form.Item>
      </Form>
      <Divider />
      <Table
        columns={columns}
        dataSource={dataSource.map((d, index) => {
          const data = dayjs(d.cycleTime).tz(TZ);
          return {
            ...d,
            index: index + 1,
            cycleTime: `每天${data.get('hours')}時${data.get('minute')}分`,
            stockIDs: d.IDs.join(','),
          };
        })}
      />
    </div>
  );
};
