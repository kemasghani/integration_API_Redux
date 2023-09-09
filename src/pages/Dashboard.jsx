import { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { fetchAllPresensis } from '../features/dataSlice';
import { Table, Progress, Badge } from 'antd';

function Home() {

    const [filteredInfo, setFilteredInfo] = useState({});
    const handleChange = (pagination, filters, sorter) => {
        console.log('Various parameters', pagination, filters, sorter);
        setFilteredInfo(filters);
    };
    const [data, setData] = useState();
    const dataPresensis = useSelector(state => state.dataUser.dataPresensis);
    const dispatch = useDispatch();
    const navigate = useNavigate();

    localStorage.setItem('login', '')

    // to redirect to login page if not login yet
    useEffect(() => {
        const token = localStorage.getItem('token');
        if (token == 'null') {
            navigate('/login');
        }
    }, [navigate]);

    // to get all data latest presensi
    useEffect(() => {
        dispatch(fetchAllPresensis());
    }, [dispatch]);

    // Only set the state when dataPresensis changes
    useEffect(() => {
        if (dataPresensis && dataPresensis.data) {
            setData(dataPresensis.data);
        }
    }, [dataPresensis]);

    const columns = [
        {
            title: 'Nama',
            dataIndex: 'namaLengkap',
            key: 'namaLengkap',
        },
        {
            title: 'Departement',
            dataIndex: 'namaDept',
            key: 'namaDept',
            filters: [
                {
                    text: 'Marketing',
                    value: 'Marketing',
                },
                {
                    text: 'Finance',
                    value: 'Finance',
                },
            ],
            filteredValue: filteredInfo.namaDept || null,
            onFilter: (value, record) => record.namaDept.includes(value),
            ellipsis: true,
        },
        {
            title: 'Check In',
            dataIndex: 'jamMasuk',
            key: 'jamMasuk',
        },
        {
            title: 'Check Out',
            dataIndex: 'jamKeluar',
            key: 'jamKeluar',
        },
        {
            title: 'Date',
            dataIndex: 'tanggal',
            key: 'tanggal',
        },
    ];
    return (
        <>
            <div className='p-10 flex flex-col gap-10'>
                <div className="departementRecap  bg-white pb-14">
                    <div className="explainColor flex gap-7 justify-center py-7">
                        <Badge color='green' text='Hadir' />
                        <Badge color='blue' text='Izin' />
                        <Badge color='red' text='Tanpa keterangan' />
                    </div>
                    <div className="cardContainer justify-center flex gap-[30px] flex-wrap">
                        <div className='card bg-[#F2F3F7] w-[200px] p-8'>
                            <p className='font-bold mb-3'>Marketing</p>
                            <div className="progressBarContainer">
                                <div className="pressentBar">
                                    <Progress percent={30} strokeColor='green' />
                                </div>
                                <div className="permissionBar">
                                    <Progress percent={30} />
                                </div>
                                <div className="unknownBar">
                                    <Progress percent={30} strokeColor='red' />
                                </div>
                            </div>
                        </div>
                        <div className='card bg-[#F2F3F7] w-[200px] p-8'>
                            <p className='font-bold mb-3'>Finance</p>
                            <div className="progressBarContainer">
                                <div className="pressentBar">
                                    <Progress percent={70} strokeColor='green' />
                                </div>
                                <div className="permissionBar">
                                    <Progress percent={20} />
                                </div>
                                <div className="unknownBar">
                                    <Progress percent={10} strokeColor='red' />
                                </div>
                            </div>
                        </div>
                        <div className='card bg-[#F2F3F7] w-[200px] p-8'>
                            <p className='font-bold mb-3'>HRD</p>
                            <div className="progressBarContainer">
                                <div className="pressentBar">
                                    <Progress percent={50} strokeColor='green' />
                                </div>
                                <div className="permissionBar">
                                    <Progress percent={30} />
                                </div>
                                <div className="unknownBar">
                                    <Progress percent={20} strokeColor='red' />
                                </div>
                            </div>
                        </div>
                        <div className='card bg-[#F2F3F7] w-[200px] p-8'>
                            <p className='font-bold mb-3'>IT</p>
                            <div className="progressBarContainer">
                                <div className="pressentBar">
                                    <Progress percent={30} strokeColor='green' />
                                </div>
                                <div className="permissionBar">
                                    <Progress percent={30} />
                                </div>
                                <div className="unknownBar">
                                    <Progress percent={30} strokeColor='red' />
                                </div>
                            </div>
                        </div>
                        <div className='card bg-[#F2F3F7] w-[200px] p-8'>
                            <p className='font-bold mb-3'>Designer</p>
                            <div className="progressBarContainer">
                                <div className="pressentBar">
                                    <Progress percent={30} strokeColor='green' />
                                </div>
                                <div className="permissionBar">
                                    <Progress percent={30} />
                                </div>
                                <div className="unknownBar">
                                    <Progress percent={30} strokeColor='red' />
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
                <Table columns={columns} dataSource={data} onChange={handleChange} pagination={{
                    pageSize: 4,
                }} />
            </div>
        </>
    );
}

export default Home