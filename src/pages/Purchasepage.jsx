import React from 'react';
import { useParams, useNavigate } from 'react-router-dom'; // Import useNavigate instead of useHistory
import PurchaseForm from '../components/PurchaseForm';
import { useLocation } from 'react-router-dom';

const PurchasePage = () => {
    const location = useLocation();
    const productId = location.state.productId;
    const userId = localStorage.getItem('userId');
    const navigate = useNavigate(); 

    if (!userId) {
        navigate('/login'); 
        return null; 
    }

    return (
        <div>
            <PurchaseForm productId={productId} userId={userId} />
        </div>
    );
};

export default PurchasePage;
