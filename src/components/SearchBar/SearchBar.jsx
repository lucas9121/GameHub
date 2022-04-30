export default function SearchBar() {
    return (
        <div className="SearchBar">
            <form>
                <input type='text' defaultValue='Search' />
                <input type='submit' value='Search' />
            </form>
        </div>
    )
}