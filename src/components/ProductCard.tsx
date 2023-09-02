'use clinet'
import { ICategory, IProductCardProps } from '@/commonInterfaces/interface';
import { useAppDispatch } from '@/store/hook';
import { setComponent } from '@/store/pcBuilder';
import Image from 'next/image';
import Link from 'next/link';
import { useRouter } from 'next/router'


const ProductCard = (props:IProductCardProps) => {
  const router = useRouter();
  const dispatch = useAppDispatch();
  const {product,category} = props
  const handleClick=()=>{
    dispatch(setComponent({product,category:category?.data}))
    router.push('/pc-builder');
  }
    return (
        
          <div className="bg-white p-4 rounded-lg shadow-lg transition transform hover:scale-105">
            <Link href={`/product/${product.id}`}>
              <Image width={150} height={150} src={product?.Image} alt={product?.ProductName} className="w-full h-auto mb-2" />
              <h3 className="text-xl font-semibold mb-2">{product?.ProductName}</h3>
              <p className="text-gray-500 mb-1">{product?.Category}</p>
              <p className="text-gray-800 font-semibold mb-1">${product?.Price}</p>
              <p className={product?.Status === 'In Stock' ? 'text-green-600' : 'text-red-600'}>{product?.Status}</p>
              <div className="flex items-center">
                <span className="text-yellow-400">{product?.Rating} Stars</span>
              </div>
            </Link>

            {
            category?(
              <button onClick={()=>handleClick()} className="btn btn-xs">Add to PC Builder</button>
            ):''
          }
          </div>
          
    );
};

export default ProductCard;