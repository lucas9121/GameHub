
export default function DevGameButton({game}) {
    return(
        <div>
            {
                // edit game button for developer user if game wasn't rejected
                game.approved !== 'no' ? 
                <button className="btn yes-btn" onClick={() => navigate(`/${game._id}/edit`)} >Edit</button> :
                // Explanation for developer and edit button if game was rejected by admin
                game.approved === 'no' ?
                <div>
                    <p>{game.reason}</p>
                    <button className="btn yes-btn" onClick={() => navigate(`/${game._id}/edit`)} >Edit</button> 
                </div> : null
            }
        </div>
    )
}