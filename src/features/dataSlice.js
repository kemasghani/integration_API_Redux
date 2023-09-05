import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import axios from 'axios';

const apiUrl = import.meta.env.VITE_API_URI;


export const fetchAllPresensis = createAsyncThunk('data/fetchAllPresensis', async (_, thunkAPI) => {
    try {
        const token = localStorage.getItem('token');
        const response = await axios.get(`${apiUrl}/api/v1/presensis`, {
            headers: {
                Authorization: `Bearer ${token}`,
            },
        });
        return response.data;
    } catch (error) {
        if (error.response) {
            const message = error.response.data.msg;
            return thunkAPI.rejectWithValue(message);
        }
    }
});
// Fetch all izins
export const fetchAllIzins = createAsyncThunk('data/fetchAllIzins', async (_, thunkAPI) => {
    try {
        const token = localStorage.getItem('token');
        const response = await axios.get(`${apiUrl}/api/v1/Izins/norespons`, {
            headers: {
                Authorization: `Bearer ${token}`,
            },
        });
        return response.data;
    } catch (error) {
        if (error.response) {
            const message = error.response.data.msg;
            return thunkAPI.rejectWithValue(message);
        }
    }
});

export const fetchIzinById = createAsyncThunk('data/fetchIzinById', async (izinId, thunkAPI) => {
    try {
        const token = localStorage.getItem('token');
        const response = await axios.get(`${apiUrl}/api/v1/izins/${izinId}`, {
            headers: {
                Authorization: `Bearer ${token}`,
            },
        });
        return response.data;
    } catch (error) {
        if (error.response) {
            const message = error.response.data.msg;
            return thunkAPI.rejectWithValue(message);
        }
    }
});

// Fetch all karyawans
export const fetchAllKaryawans = createAsyncThunk('data/fetchAllKaryawans', async (_, thunkAPI) => {
    try {
        const token = localStorage.getItem('token');
        const response = await axios.get(`${apiUrl}/api/v1/karyawans`, {
            headers: {
                Authorization: `Bearer ${token}`,
            },
        });
        return response.data;
    } catch (error) {
        if (error.response) {
            const message = error.response.data.msg;
            return thunkAPI.rejectWithValue(message);
        }
    }
});

// Fetch karyawan by ID
export const fetchKaryawanById = createAsyncThunk('data/fetchKaryawanById', async (karyawanId, thunkAPI) => {
    try {
        const token = localStorage.getItem('token');
        const response = await axios.get(`${apiUrl}/api/v1/karyawans/${karyawanId}`, {
            headers: {
                Authorization: `Bearer ${token}`,
            },
        });
        return response.data;
    } catch (error) {
        if (error.response) {
            const message = error.response.data.msg;
            return thunkAPI.rejectWithValue(message);
        }
    }
});

// Approve an existing izin
export const approveIzin = createAsyncThunk(
    'data/approveIzin',
    async (id, thunkAPI) => {
        try {
            const token = localStorage.getItem('token');
            const response = await axios.post(
                `${apiUrl}/api/v1/izin/approve/${id}`,
                {},
                {
                    headers: {
                        Authorization: `Bearer ${token}`,
                    },
                }
            );
            return response.data;
        } catch (error) {
            if (error.response) {
                const message = error.response.data.msg;
                return thunkAPI.rejectWithValue(message);
            }
        }
    }
);


// reject an existing izin
export const rejectIzin = createAsyncThunk('data/rejectIzin', async (id, thunkAPI) => {
    try {
        const token = localStorage.getItem('token');
        const response = await axios.post(`${apiUrl}/api/v1/izin/reject/${id}`, {
            headers: {
                Authorization: `Bearer ${token}`,
            },
        });
        return response.data;
    } catch (error) {
        if (error.response) {
            const message = error.response.data.msg;
            return thunkAPI.rejectWithValue(message);
        }
    }
});
const dataSlice = createSlice({
    name: 'data',
    initialState: {
        dataPresensis: null,
        dataIzins: null,
        singleDataIzin: null,
        dataKaryawans: null,
        singleDataKaryawan: null,
        status: 'idle',
        error: null,
    },
    reducers: {},
    extraReducers: (builder) => {
        builder
            .addCase(fetchAllPresensis.pending, (state) => {
                state.status = 'loading';
            })
            .addCase(fetchAllPresensis.fulfilled, (state, action) => {
                state.status = 'succeeded';
                state.dataPresensis = action.payload;
            })
            .addCase(fetchAllPresensis.rejected, (state, action) => {
                state.status = 'failed';
                state.error = action.error.message;
            })
            .addCase(fetchAllIzins.pending, (state) => {
                state.status = 'loading';
            })
            .addCase(fetchAllIzins.fulfilled, (state, action) => {
                state.status = 'succeeded';
                state.dataIzins = action.payload;
            })
            .addCase(fetchAllIzins.rejected, (state, action) => {
                state.status = 'failed';
                state.error = action.error.message;
            })
            .addCase(fetchIzinById.pending, (state) => {
                state.status = 'loading';
            })
            .addCase(fetchIzinById.fulfilled, (state, action) => {
                state.status = 'succeeded';
                state.singleDataIzin = action.payload;
            })
            .addCase(fetchIzinById.rejected, (state, action) => {
                state.status = 'failed';
                state.error = action.error.message;
            })
            .addCase(fetchAllKaryawans.pending, (state) => {
                state.status = 'loading';
            })
            .addCase(fetchAllKaryawans.fulfilled, (state, action) => {
                state.status = 'succeeded';
                state.dataKaryawans = action.payload;
            })
            .addCase(fetchAllKaryawans.rejected, (state, action) => {
                state.status = 'failed';
                state.error = action.error.message;
            })
            .addCase(fetchKaryawanById.pending, (state) => {
                state.status = 'loading';
            })
            .addCase(fetchKaryawanById.fulfilled, (state, action) => {
                state.status = 'succeeded';
                state.singleDataKaryawan = action.payload;
            })
            .addCase(fetchKaryawanById.rejected, (state, action) => {
                state.status = 'failed';
                state.error = action.error.message;
            })
            .addCase(approveIzin.fulfilled, (state) => {
                state.status = 'succeeded';
                // You can optionally update the state here if needed
            })
            .addCase(approveIzin.rejected, (state, action) => {
                state.status = 'failed';
                state.error = action.error.message;
            })
            .addCase(rejectIzin.fulfilled, (state) => {
                state.status = 'succeeded';
                // You can optionally update the state here if needed
            })
            .addCase(rejectIzin.rejected, (state, action) => {
                state.status = 'failed';
                state.error = action.error.message;
            })
    },
});

export default dataSlice.reducer;
