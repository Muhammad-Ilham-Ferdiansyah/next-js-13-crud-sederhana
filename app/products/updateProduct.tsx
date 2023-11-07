'use client';
import {SyntheticEvent,useState} from 'react';
import { useRouter } from 'next/navigation';

//type definition
type Product = {
    id: number;
    title: string;
    price: number;
}

export default function UpdateProduct(product: Product) {
    const [title, setTitle] = useState(product.title);
    const [price, setPrice] = useState(product.price);
    const [modal, setModal] = useState(false);
    const [isLoading, setIsLoading] = useState(false);

    const router = useRouter();

    async function handleUpdate(e:SyntheticEvent) {
        e.preventDefault();
        setIsLoading(true);
        await fetch(`http://localhost:5000/products/${product.id}`,{
            method: 'PATCH',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({
                title: title,
                price: price,
            })
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
        <button className="btn btn-info btn-sm hover:bg-sky-700 text-white" onClick={handleChange}>Edit</button>
        <input type="checkbox" checked={modal} onChange={handleChange} className="modal-toggle" />
        <div className="modal">
            <div className="modal-box">
                <h3 className="font-bold text-lg">
                    Edit {product.title}
                </h3>
                <form action="#" onSubmit={handleUpdate}>
                    <div className="form-control">
                        <label className="label font-bold">Title</label>
                        <input 
                        type="text" 
                        value={title}
                        onChange={(e) => setTitle(e.target.value)}
                        className="input w-full input-bordered" 
                        placeholder="Product Name"/>
                    </div>
                    <div className="form-control">
                        <label className="label font-bold">Price</label>
                        <input 
                        type="text" 
                        value={price}
                        onChange={(e) => setPrice(Number(e.target.value))}
                        className="input w-full input-bordered" 
                        placeholder="Price"/>
                    </div>
                    <div className="modal-action">
                        <button className="btn btn-error hover:bg-red-700 text-white" onClick={handleChange} type="button">Close</button>  
                        {!isLoading ? (
                            <button className="btn btn-accent" type="submit">Update</button>
                        ) : (
                            <button className="btn btn-neutral" type="button">Updating...</button>
                        )}
                    </div>
                </form>
            </div>
        </div>
    </div>
  )
}
