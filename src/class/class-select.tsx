import { useEffect, useState } from 'react';
import { usePocketbase } from '../infra/pocketbase/index';
import { Class } from '../infra/collections';
import { Select } from '../core';

export interface ClassSelectProps {
    onChange?: (value: string) => void;
    value?: string;
}

export const ClassSelect: React.FC<ClassSelectProps> =  ({
    onChange,
    value
}) => {
    const pocketbase = usePocketbase();
    const [classes, setClasses] = useState<Class[]>([]);


    useEffect(() => {
        async function fetchClasses() {
            try {
                const classList = await pocketbase.class.getList();
                setClasses(classList);
            } catch (error) {
                console.error("Failed to fetch classes:", error);
            }
        }

        fetchClasses();
    }, [classes, pocketbase.class]);

    return (
        <Select 
            onChange={onChange}
            value={value}
            options={classes.map((c) => ({ value: c.id, label: c.name }))} 
            label="Select a class" />
    )

}