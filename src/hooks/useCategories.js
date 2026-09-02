
import { useCallback, useEffect, useState } from "react";
import { getAll, create, update, deleteCategory, getOne } from "../services/category.service";

export const useCategories = () => {
    const [categories, setCategories] = useState([]);
    const [loading, setLoading] = useState(false);
    const [currentPage, setCurrentPage] = useState(1);
    const [lastPage, setLastPage] = useState(1);
    
    const fetchCategories = useCallback(async (page = 1) => {
        setLoading(true);
        try{
            const data = await getAll(page);
            if (data && data.data) {
                setCategories(data.data);
                setCurrentPage(data.current_page);
                setLastPage(data.last_page);
            }else{
                setCategories(data || []);
            }
        } catch(e) {
            setCategories([]);
        } finally {
            setLoading(false);
        }
    }, []);

    useEffect(() => {
        fetchCategories(currentPage);
    }, [fetchCategories, currentPage]);

    const changePage = (page) => {
        if (page >= 1 && page <= lastPage) {
            setCurrentPage(page);
        }
    };

    const addCategory = async (categoryData) => {
        await create(categoryData);
        await fetchCategories(currentPage);
    };

    const editCategory = async (id, categoryData) => {
        await update(id, categoryData);
        await fetchCategories(currentPage);
    }

    const removeCategory = async (id) => {
        await deleteCategory(id);
        const pageToFetch = (categories.length === 1 && currentPage > 1) 
        ? currentPage - 1 
        : currentPage;
        await fetchCategories(pageToFetch);
    };

    const getCategoryDetails = async (id) => {
        return await getOne(id);
    };

    return { categories, loading, addCategory, editCategory, removeCategory, getCategoryDetails, currentPage, lastPage, changePage };
};
