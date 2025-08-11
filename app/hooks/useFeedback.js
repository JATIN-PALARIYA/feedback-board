// app/hooks/useFeedback.js
'use client';

import { useEffect, useState } from 'react';

export default function useFeedback({ searchQuery = '', selectedTags = [], view = 'inbox' } = {}) {
  const [list, setList] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  useEffect(() => {
    let mounted = true;
    async function fetchData() {
      setLoading(true);
      setError(null);
      try {
        const params = new URLSearchParams();
        if (searchQuery) params.append('search', searchQuery);
        if (selectedTags?.length) params.append('tags', selectedTags.join(','));
        if (view) params.append('view', view);

        const res = await fetch(`/api/feedback?${params.toString()}`);
        const json = await res.json();
        if (!res.ok) throw new Error(json.error || 'Failed to fetch feedback');
        if (mounted) setList(json.data || []);
      } catch (err) {
        if (mounted) setError(err.message || 'Unknown error');
      } finally {
        if (mounted) setLoading(false);
      }
    }
    fetchData();
    return () => { mounted = false; };
  }, [searchQuery, JSON.stringify(selectedTags), view]);

  return { list, setList, loading, error };
}
