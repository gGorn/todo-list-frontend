import AddPersonModal from '@/components/ui/AddPersonModal';
import { Button } from '@/components/ui/button';
import DataTable from '@/components/ui/DataTable'
import { useState, useEffect } from "react";
import moment from "moment";
import { useToast } from "@/hooks/use-toast";
import axios from "axios";

const Home = () => {
  const handleActionClick = (row) => {
    setUser(row);
    setShowModal(true);
  };

  const handleActionAdd = () => {
    setUser(null);
    setShowModal(true);
  };

  const [showModal, setShowModal] = useState(false);
  const [user, setUser] = useState(null);
  const [data, setData] = useState([]); // Store fetched data

  const columns = [
    {
      accessorKey: "id",
      header: "id",
      cell: (info) => info.getValue(),
    },
    {
      accessorKey: "name",
      header: "ชื่อ-นามสกุล",
      cell: ({ row }) => row.original.first_name + " " + row.original.last_name,
    },
    {
      accessorKey: "address",
      header: "ที่อยู่",
      cell: (info) => info.getValue(),
    },
    {
      accessorKey: "birth_date",
      header: "วันเกิด",
      cell: (info) => moment(info.getValue()).format("DD/MM/YYYY"),
    },
    {
      accessorKey: "age",
      header: "อายุ",
      cell: ({ row }) => AgeCalculator(row.original.birth_date),
    },
    {
      header: "Action",
      cell: ({ row }) => (
        <button
          onClick={() => handleActionClick(row.original)}
          className="px-3 py-1 bg-blue-500 text-white rounded-md hover:bg-blue-600"
        >
          View
        </button>
      ),
    },
  ];

  const AgeCalculator = (birthDate) =>
    moment().diff(moment(birthDate), "years");

  const { toast } = useToast();
  
  // Fetch data from API
  const fetchData = async () => {
    try {
      const apiUrl = import.meta.env.VITE_API_URL;
      const response = await axios.get(`${apiUrl}users`);
      const data = response.data.map(item => ({
        ...item,
        birth_date: moment(item.birth_date).format("YYYY-MM-DD"), // Format date
      }));
      setData(data); // Set the fetched data
    } catch (error) {
      toast({
        variant: "destructive",
        title: "Failed",
        description: error.message,
      });
    } 
  };

  useEffect(() => {
    fetchData();
  }, []);

  return (
    <>
      <div className="flex flex-col p-4 mb-4">
        <div className="flex justify-end mb-4">
          <Button
            className="bg-blue-500 text-white rounded-md hover:bg-blue-600 px-4 py-2 w-fit"
            onClick={() => handleActionAdd()}
          >
            Add
          </Button>
        </div>
        <DataTable columns={columns} data={data} />
        <AddPersonModal
          show={showModal}
          setShow={setShowModal}
          user={user}
          fetchUser={fetchData}
        />
      </div>
    </>
  );
}

export default Home