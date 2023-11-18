import React, { useEffect, useState } from 'react';
import { redirect, useParams } from 'react-router-dom';
import PageNotFound from 'app/shared/error/page-not-found';
import { CircularProgressbar } from 'react-circular-progressbar';
import 'react-circular-progressbar/dist/styles.css';

interface ListPatientProps {
  nom: string;
  isAuthen: boolean;
  role: string[];
}

const Listpatient: React.FC<ListPatientProps> = props => {
  const { dermatologue_id } = useParams<{ dermatologue_id: string }>();
  const [loading, setLoading] = useState(true);
  const [data, setData] = useState([]);
  const [progress, setProgress] = useState(0);

  useEffect(() => {
    const controller = new AbortController();
    const signal = controller.signal;
    const fetchData = async () => {
      try {
        const response = await fetch('https://api.github.com/', {
          method: 'GET',
          signal: signal,
        });

        if (!response.ok) {
          throw new Error('Network response was not ok');
        }

        const reader = response.body?.getReader();
        if (!reader) {
          throw new Error('ReadableStream not supported');
        }

        const contentLength = Number(response.headers.get('Content-Length'));
        let receivedLength = 0;

        while (true) {
          const { done, value } = await reader.read();

          if (done) {
            break;
          }

          receivedLength += value.length;
          const newProgress = (receivedLength / contentLength) * 100;
          setProgress(Math.min(100, newProgress));
        }
      } catch (error) {
        console.error('Error fetching data:', error);
      }
      await new Promise(resolve => setTimeout(resolve, 500));
      setLoading(false);
    };

    fetchData();
    return () => controller.abort();
  }, [dermatologue_id]);

  if (props.isAuthen && (props.role.includes('ROLE_ADMIN') || props.role.includes('ROLE_SECRETAIRE'))) {
    return (
      <div>
        {loading && (
          <div style={{ width: 200, height: 200 }}>
            <CircularProgressbar value={progress} text={`${progress}%`} />
          </div>
        )}
        <p>
          Bienvenue, {props.nom}! Dermatologue ID: {dermatologue_id}
        </p>
      </div>
    );
  }

  return <PageNotFound />;
};

export default Listpatient;
