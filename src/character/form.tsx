import { useState } from "react";
import { ClassSelect } from "../class";
import { Input } from "../core";

export const CharacterForm = () => {
    const [character, setCharacter] = useState({ name: "", level: 1, class: "" });  

    return (
        <>
            <form action="">
            <Input label="Character Name" type="text" name="name" value="" onChange={e => setCharacter({...character, name: e.target.value})}  />
            <Input label="Character Level" type="number" name="name" value="" onChange={e => setCharacter({...character, level: Number(e.target.value)})}  />
            <ClassSelect onChange={cls => setCharacter({...character, class: cls})} value={character.class} />
            </form>
        </>
    );
}