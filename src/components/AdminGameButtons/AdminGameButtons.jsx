
export default function AdminGameButtons({game, noBtn, setNoBtn, noReason, handleApproved}){
    return(
        <div>
            {
            // if admin has already been rejected the game before
                game.reason ?
                <>
                    <h5>Previous comment</h5>
                    <p>{game.reason}</p>
                    <>
                        <h5 style={{marginBottom: '10px'}}>Approved?</h5>
                        <rndm style={{display: 'flex', marginBottom: '10px', gap: '5px'}}>
                            <button className="btn yes-btn" onClick={(evt) => {handleApproved(evt, 'yes')}}>Yes</button>
                            <button className="btn no-btn" onClick={() => {setNoBtn(true)}}>No</button>
                        </rndm> 
                    </>
                </> :
                // if game hasn't been rejected before
                <>
                    <h5 style={{marginBottom: '10px'}}>Approved?</h5>
                    <rndm style={{display: 'flex', marginBottom: '10px', gap: '5px'}}>
                        <button className="btn yes-btn" onClick={(evt) => {handleApproved(evt, 'yes')}}>Yes</button>
                        <button className="btn no-btn" onClick={(evt) => {setNoBtn(true)}}>No</button>
                    </rndm> 
                </>
            }
            {
                // if admin didn't approve the game show the text box to give reasons why
                noBtn ?
                <form onSubmit={(evt) => {handleApproved(evt, 'no')}}>
                    <label>Explain what needs to be changed</label>
                    <textarea cols="40" rows="3" ref={noReason} required></textarea>
                    <div>
                        <button type="submit" className="btn yes-btn">Submit</button>
                        <button className="btn no-btn" onClick={() => {setNoBtn(false)}}>Cancel</button>
                    </div>
                </form> : null
            }
        </div>
    )
}