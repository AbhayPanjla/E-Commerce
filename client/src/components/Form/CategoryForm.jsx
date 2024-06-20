const CategoryForm = ({ CategoryFormSubmitter, value, setValue }) => {
    return (
        <>
            <form onSubmit={CategoryFormSubmitter}>
                <div className="mb-3">
                    <input type="text" required className="form-control" value={value} onChange={(e) => setValue(e.target.value)} />
                </div>

                <button type="submit" className="btn btn-primary">Submit</button>
            </form>

        </>
    )
}
export default CategoryForm;