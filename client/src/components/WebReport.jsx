import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { CSVLink } from "react-csv";

const WebReport = () => {

    const [actualEstadistics, setActualEstadistics] = useState([]);
    const [actualReport, setActualReport] = useState([]);
    const [lastGenerationTime, setLastGenerationTime] = useState("")

    const getEstadisticsAndUpdateReport = async () => {
        console.log("Buscando estadisticas")
        try {
        const response = await axios.get("http://localhost:4000/estadistics");
        const databaseData = response.data;
        setActualEstadistics(databaseData);
        console.log(databaseData);
        } catch (error) {
        console.error('Error al obtener estadísticas:', error);
        }
    };

    const getReportAboutEstadistics = (actualEstadistics) => {
        console.log("BUSCO NUEVA ESTADISTICAS")
        const agroupEstadisticsByPlayerId = actualEstadistics.reduce((acc, el) => {
            const playerId = el.nickName;
            if (acc[playerId]) {
                acc[playerId].push({...el}); 
            } else {
                acc[playerId] = [{...el}]; 
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
        console.log("EJECUTO INTERVALO PARA OBTENER ESTADISTICAS")
        const intervalId = setInterval(() => {
            getEstadisticsAndUpdateReport();
        }, 10 * 1000);
        return () => clearInterval(intervalId);
    }, []);  

    useEffect(() => {
        const lastGenerationTime = localStorage.getItem('lastGenerationTime');
        if (lastGenerationTime) {
            setLastGenerationTime(new Date(JSON.parse(lastGenerationTime)));
        }
        if (actualEstadistics.length > 0) {
            console.log("Buscando reporte")
            getReportAboutEstadistics(actualEstadistics);
        }
    }, [actualEstadistics]);

    const csvData = [
        ["Jugador", "Mejor Puntuacion", "Fecha de Último Cambio"],
        ...actualReport.map(rep => [
           rep.player,
           rep.bestPuntuaction,
           lastGenerationTime ? lastGenerationTime.toLocaleString() : 'N/A'
        ]),
    ];

    return (
        <div>
           {actualReport.length === 0 ?
            <p>Cargando..</p> :
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
            </div>}
          
            <p className='mt-4 font-bold underline text-zinc-600'>Last Change: {lastGenerationTime ? lastGenerationTime.toLocaleString() : 'N/A'}</p>
            <CSVLink data={csvData} filename={"estadisticas.csv"}>
                Exportar a CSV
            </CSVLink>
        </div>
    );
};

export default WebReport;