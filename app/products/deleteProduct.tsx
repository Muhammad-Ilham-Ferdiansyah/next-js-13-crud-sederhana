'use client';
import {useState} from 'react';
import { useRouter } from 'next/navigation';

//type definition
type Product = {
    id: number;
    title: string;
    price: number;
}

export default function DeleteProduct(product: Product) {

    const [modal, setModal] = useState(false);
    const [isLoading, setIsLoading] = useState(false);

    const router = useRouter();

    async function handleDelete(productId: number) {
        setIsLoading(true);
        await fetch(`http://localhost:5000/products/${productId}`,{
            method: 'DELETE',
        });

        setIsLoading(false);
        router.refresh();
        setModal(false);
    }

    function handleChange(){
        setModal(!modal);
    }
  return (
    <div>
        <button className="btn btn-error btn-sm hover:bg-red-700 text-white" onClick={handleChange}>Delete</button>
        <input type="checkbox" checked={modal} onChange={handleChange} className="modal-toggle" />
        <div className="modal">
            <div className="modal-box">
                <h3 className="font-bold text-lg">
                    Are you sure to delete {product.title}?
                </h3>
                    <div className="modal-action">
                        <button className="btn btn-error hover:bg-red-700 text-white" onClick={handleChange} type="button">Close</button>  
                        {!isLoading ? (
                            <button className="btn btn-accent" type="button" onClick={()=>handleDelete(product.id)}>Delete</button>
                        ) : (
                            <button className="btn btn-neutral" type="button">Deleting...</button>
                        )}
                    </div>
            </div>
        </div>
    </div>
  )
}
