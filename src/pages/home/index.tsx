import { Button } from 'antd';
import { useRequest } from 'ahooks';
import { getBuyerCartVideos } from '@/services/bus';

export default function HomePage() {
  const { data } = useRequest(() => getBuyerCartVideos());
  return (
    <div>
      <Button type="primary">{JSON.stringify(data)}</Button>
    </div>
  );
}
