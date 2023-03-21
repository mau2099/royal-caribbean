
import { Button } from '@mui/material';
import { DataGrid, GridColDef } from '@mui/x-data-grid';
import invariant from 'tiny-invariant';
import { useData } from '../../App';
import { Item } from '../Form/types';
import { Container } from './styled';

export const DataTable = () => {

  const columns: GridColDef[] = [
    { field: 'id', headerName: 'ID', width: 70 },
    {
      field: 'title', headerName: 'Title', width: 700,
      editable: true,
    },
    {
      field: 'completed', headerName: 'Completed', width: 130,
      editable: true,
    },
    {
      field: 'actions',
      headerName: 'Actions',
      width: 150,
      renderCell: (params) => {
        return (
          <>
            <Button variant="contained" color="secondary" onClick={() => handleDelete(params.row)}>
              Delete
            </Button>
          </>
        )
      },
    },
  ];

  const { data, setData } = useData()
  invariant(data, 'data must be set')
  invariant(setData, 'setData must be set')

  const handleDelete = (row: Item) => {
    const filteredArray = data.filter((r) => r.id !== row.id)
    setData(filteredArray);
    localStorage.setItem('rc-data', JSON.stringify(filteredArray))
  };

  return (
    <Container data-testid='data-table'>
      <DataGrid
        rows={data}
        columns={columns}
        onCellEditStop={(rowData) => {
            const index = data.findIndex((item) => item.id === rowData.id);

            if (index !== -1) {
              const updatedArray = data.map((item) => {
                if (item.id === rowData.id) {
                  return { ...item, ...rowData.row };
                }
                return item;
              });
              setData(updatedArray);
              console.log(rowData);

              localStorage.setItem('rc-data', JSON.stringify(updatedArray))
            }

        }}

      />
    </Container>
  );
}