import { Await, useLoaderData } from 'react-router-dom';

import { Product } from '../../interfaces/product.interface';

import { Suspense } from 'react';
import { useDispatch } from 'react-redux';
import styles from './Product.module.css';
import { cartActions } from '../../store/cart.slice';
import { useNavigate } from 'react-router-dom';
import { AppDispath } from '../../store/store';
import { useParams } from 'react-router-dom';

export function Product(
	
) {
	const navigate = useNavigate();
	const { id } = useParams();
	console.log('id param=');
	console.log(id);
	const data = useLoaderData() as { data: Product };

	
	console.log('id data=');
	console.log(data.data.id);
	
	const dispatch = useDispatch<AppDispath>();
	const idn= Number(id);
	console.log('idn param=');
	console.log(idn);
	const add = (e: React.MouseEvent<HTMLButtonElement, MouseEvent>,id) => {
		e.preventDefault();
		
		dispatch(cartActions.add(idn));
		
	};
	return (<>
	
		<Suspense fallback={'Загружаю...'}>
			<Await
				resolve={data.data}
			>
				{({ data }: { data: Product }) => (
					
					<> 
					
						<div className={styles['products-heeader']}>
							<button className={styles['out-to-menu']} onClick={() => navigate('/')}>
								<img src="/path-out.svg" alt="Назад" />
							</button>
							<h1 className={styles['products-name']}>{data.id}</h1>
							<h1 className={styles['products-name']}>{data.name}</h1>
							<button className={styles['add-to-cart']} onClick={add}>
								<img className={styles['img-add-to-cart']} src="/cart-button-icon.svg" alt="Добавить в корзину" />В корзину
							</button>
						</div>	
						<div className={styles['products-main']}>
							<div className={styles['image']} style={{ backgroundImage: `url('${data.image}')` }}></div>
							<div className={styles['products-list']}>
								<div className={styles['products-price']}>Цена: 
									<span className={styles['price-num']}>{data.price}</span>
									<span className={styles['currency']}>₽</span>
								</div>
								<div className={styles['products-rating']}>
									Рейтинг: 
									<span className={styles['rating-num']}>{data.rating}&nbsp;
										<img src="/star-icon.svg" alt="Иконка звезды" />
									</span>
								</div>
								<div>Состав:</div>
								<ul className={styles['ingradient-list']}>
									{data.ingredients.map((ingradient) => <li>{ingradient}</li>)}
								</ul>
								
							</div>
						</div>
						
					</>
				)}
			</Await>
		</Suspense>

	
	</>
	);
}
export default Product;