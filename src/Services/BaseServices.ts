import { AxiosResponse } from 'axios';
import { environment } from '../Config';
import { api } from '../Middleware';
import { Id } from './services.types';

const params = {
	api_key: environment.apiKey,
	page: 1,
	language: 'en-US'
}

const findAll = async(): Promise<AxiosResponse<any, any>> => {
	return await api.get('/top_rated', { params });
}

const findOne = async(id: Id): Promise<AxiosResponse<any, any>> => {
	return await api.get(`/${id}`, { params });
}

const services = {
	findAll,
	findOne
}

export default services;