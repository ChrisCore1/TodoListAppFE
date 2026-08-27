import { useCallback, useEffect, useState } from "react";
import { getAll, create, getOne, update } from '../services/tag.service';

export const useTags = () => {
    const [tags, setTags] = useState([]);
    const [loading, setLoading] = useState(false);

    const fetchTags = useCallback(async () => {
        setLoading(true);
        try{
            const data = await getAll();
            setTags(data || []);
        }catch(e){
            setTags([]);
        }finally{
            setLoading(false);
        }
    }, []);

    useEffect(() => {
        fetchTags();
    }, [fetchTags]);

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

    return { tags, loading, addTag, getTagDetails, editTag };
};
