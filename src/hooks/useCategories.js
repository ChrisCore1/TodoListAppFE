
import { useCallback, useEffect, useState } from "react";
import { getAll, create, update, deleteCategory, getOne } from "../services/category.service";

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

    const editCategory = async (id, categoryData) => {
        await update(id, categoryData);
        await fetchCategories();
    }

    const removeCategory = async (id) => {
        await deleteCategory(id);
        await fetchCategories();
    };

    const getCategoryDetails = async (id) => {
        return await getOne(id);
    };

    return { categories, loading, addCategory, editCategory, removeCategory, getCategoryDetails };
};
