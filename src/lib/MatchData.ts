
import Papa from 'papaparse';
import fs from 'fs';
import path from 'path';

type Callback = (data:any) => void;

const useFetch = () => {

    const sanitizeColumns = (data: any) => {
        return data.map((item: any) => {
            const sanitizedItem: any = {};
            Object.keys(item).forEach(key => {
                const sanitizedKey = key.toLowerCase().replace(/(\s|-)+/g , '_');
                sanitizedItem[sanitizedKey] = item[key];
            })
            return sanitizedItem
        })
    }

    // const fetchCsvData = async (filePath: string, callback: Callback) => {
    //     const response = await fetch(filePath);
    //     const reader = response.body!.getReader();
    //     const result = await reader.read();
    //     const decoder = new TextDecoder('utf-8');
    //     const csvString = decoder.decode(result.value!);
    //     const { data } = Papa.parse(csvString, {
    //         header: true,
    //         dynamicTyping: true
    //     })
    //     const sanitizedData = sanitizeColumns(data);
    //     callback(sanitizedData);
    // }

    const fetchCsvData = async (filePath: string) => {
        const response = await fetch(filePath);
        const reader = response.body!.getReader();
        const result = await reader.read();
        const decoder = new TextDecoder('utf-8');
        const csvString = decoder.decode(result.value!);
        const { data } = Papa.parse(csvString, {
            header: true,
            dynamicTyping: true
        })
        const sanitizedData = sanitizeColumns(data);
        return sanitizedData
    }

    return { fetchCsvData }

}

export default useFetch;
