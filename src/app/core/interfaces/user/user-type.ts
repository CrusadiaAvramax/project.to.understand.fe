import {RegisterUserRequest} from '../auth/register-user-request';
import {OrderType} from './order-type';

export interface UserType extends RegisterUserRequest {

  orders: OrderType[];
}
