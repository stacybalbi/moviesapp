import axion from 'axios';
import { environment } from '../../Config';

export const api = axion.create({
	baseURL: environment.apiUrl,
	headers: {
		'Content-Type': 'application/json',
	},
});