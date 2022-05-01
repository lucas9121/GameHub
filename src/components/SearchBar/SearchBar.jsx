export default function SearchBar() {
    return (
        <div className="SearchBar">
            <form>
                <input type='text' name="Search" placeholder="Search..."/>
                <input type='submit' value='Search' />
            </form>
        </div>
    )
}