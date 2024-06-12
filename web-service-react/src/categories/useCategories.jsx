import { useState, useEffect } from 'react';

function useCategories() {
    const [categories, setCategories] = useState([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        async function fetchCategories() {
            try {
                const response = await fetch('http://localhost:8080/');
                const data = await response.json();
                setCategories(data);
            } catch (error) {
                console.error('Не удалось получить категории:', error);
            } finally {
                setLoading(false);
            }
        }

        fetchCategories();
    }, []);

    return { categories, loading };
}

export default useCategories;