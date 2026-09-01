import { useCallback, useEffect, useState } from "react";
import { getAll, create, getOne, update, deleteTag } from '../services/tag.service';

export const useTags = () => {
    const [tags, setTags] = useState([]);
    const [loading, setLoading] = useState(false);
    const [currentPage, setCurrentPage] = useState(1);
    const [lastPage, setLastPage] = useState(1);

    const fetchTags = useCallback(async (page = 1) => {
        setLoading(true);
        try{
            const data = await getAll(page);
            if (data && data.data) {
                setTags(data.data);
                setCurrentPage(data.current_page);
                setLastPage(data.last_page);
            }else{
                setTags(data || []);
            }
        }catch(e){
            setTags([]);
        }finally{
            setLoading(false);
        }
    }, []);

    useEffect(() => {
        fetchTags(currentPage);
    }, [fetchTags, currentPage]);

    const changePage = (page) => {
        if (page >= 1 && page <= lastPage) {
            setCurrentPage(page);
        }
    };

    const addTag = async (tagData) => {
        await create(tagData);
        await fetchTags();
    };

    const getTagDetails = async (id) => {
        return await getOne(id);
    };

    const editTag = async (id, tagData) => {
        await update(id, tagData);
        await fetchTags();
    };

    const removeTag = async (id) => {
        await deleteTag(id);
        await fetchTags();
    };

    return { tags, loading, addTag, getTagDetails, editTag, removeTag, currentPage, lastPage, changePage };
};
