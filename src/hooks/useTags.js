import { useCallback, useEffect, useState } from "react";
import { getAll } from '../services/tag.service';

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

    return { tags, loading };
};
