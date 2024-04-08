import { useState } from "react";

export default function Search() {
    const [searchString, setSearchString] = useState("");

    function handleSearchChange(event) {
        // console.log(event.target);
        setSearchString(event.target.value)
    }

    return (
        <form>
            <input
                type="text"
                placeholder="Search for music here" // TODO: Better placeholder
                onChange={handleSearchChange}
            />
            <select name="searchSelect" className='mx-2'>
                <option value="artists">Artists</option>
                <option value="albums">Albums</option>
                <option value="genres">Genres</option>
            </select>
            <button type="button" class="btn btn-primary">
                Search
            </button>
        </form>
    );
}
