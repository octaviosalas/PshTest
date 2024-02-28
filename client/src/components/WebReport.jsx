import React, { useEffect, useState } from 'react';
import axios from 'axios';

const WebReport = () => {

    const [actualEstadistics, setActualEstadistics] = useState([]);
    const [actualReport, setActualReport] = useState([]);

    const getEstadisticsAndUpdateReport = async () => {
        try {
        const response = await axios.get("http://localhost:4000/estadistics");
        const databaseData = response.data;
        setActualEstadistics(databaseData);
        console.log(databaseData);
        } catch (error) {
        console.error('Error al obtener estadísticas:', error);
        }
    };

    const getReportAboutEstadistics = (estadistics) => {
        const agroupEstadisticsByPlayerId = estadistics.reduce((acc, el) => {
        const playerId = el.nickName;
        if (acc[playerId]) {
            acc[playerId].push(el);
        } else {
            acc[playerId] = [el];
        }
        return acc;
        }, {});

        const transformDataToArray = Object.entries(agroupEstadisticsByPlayerId).map(([nickName, estadistics]) => ({
        player: nickName,
        estadistics: estadistics,
        }));

        const getBestPuntuaction = transformDataToArray.map((playerData) => {
        const allPuntuactions = playerData.estadistics.map((est) => est.puntuacion).sort((a, b) => b - a)[0];
        const playerPicture = playerData.estadistics.map((est) => est.picture)[0]
        return {
            player: playerData.player,
            picture: playerPicture,
            bestPuntuaction: allPuntuactions,
        };
        });

        setActualReport(getBestPuntuaction);
        console.log(getBestPuntuaction);
        return getBestPuntuaction;
    };

    useEffect(() => {
        getEstadisticsAndUpdateReport();
        const intervalId = setInterval(() => {
        getEstadisticsAndUpdateReport();
        }, 10 * 1000);
        return () => clearInterval(intervalId);
    }, []); 

    useEffect(() => {
        if (actualEstadistics.length > 0) {
        getReportAboutEstadistics(actualEstadistics);
        }
    }, [actualEstadistics]);

    return (
        <div>
             {actualReport.map((rep) => (
                <div className='flex flex-col items-start justify-start mt-6'>
                    <div className='flex items-center gap-2'>
                        <img src={rep.picture} className='h-8 w-8 rounded-full'/>
                        <p className='text-zinc-600 font-medium text-sm'>Jugador: {rep.player}</p>
                        <p className='text-zinc-600 font-medium text-sm'>Mejor Puntuacion: {rep.bestPuntuaction}</p>
                    </div>
                </div>
             ))}
        </div>
    );
};

export default WebReport;