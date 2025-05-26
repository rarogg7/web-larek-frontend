import { ICard, IOrder, OrderResult } from '../../types';
import { Api, ApiListResponse } from '../base/api';

export interface IWebLarekModel {
	cdn: string
	items: ICard[]
	getItemsList(): Promise<ICard[]>
	postOrder(order: IOrder): Promise<OrderResult>
}

export class WebLarekModel extends Api implements IWebLarekModel {
	cdn: IWebLarekModel['cdn']
	items: IWebLarekModel['items']
	
	constructor(
		cdn: string,
		baseUrl: string,
		options?: RequestInit
	) {
		super(baseUrl, options)
		this.cdn = cdn
	}
	
	getItemsList(): Promise<IWebLarekModel['items']> {
		return this.get('/product')
			.then((data: ApiListResponse<ICard>) =>
				data.items.map((item) => ({...item, image: `${this.cdn}${item.image}`}))
			);
	}
	
	postOrder(order: IOrder): Promise<OrderResult> {
		return this.post('/order', order,).then((response: OrderResult) => response)
	}
}
