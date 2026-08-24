
import { useCallback, useEffect, useState } from "react";
import { getAll, create } from "../services/category.service";

export const useCategories = () => {
    const [categories, setCategories] = useState([]);
    const [loading, setLoading] = useState(false);
    
    const fetchCategories = useCallback(async () => {
        setLoading(true);
        try{
            const data = await getAll();
            setCategories(data || []);
        } catch(e) {
            console.error(e);
            setCategories([]);
        } finally {
            setLoading(false);
        }
    }, []);

    useEffect(() => {
        fetchCategories();
    }, [fetchCategories]);

    const addCategory = async (categoryData) => {
        await create(categoryData);
        await fetchCategories();
    };

    return { categories, loading, addCategory };
};
