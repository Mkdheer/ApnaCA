
function EditExpense({editFormData}){
    console.log(editFormData);
    const{showForm,setShowForm,setRefresh,message,setMessage} = props;
    const closeModal = () => {
        setShowForm(false);
    }
    return (
        <div className={`modal ${showForm? "is-active" : ""}`}>
        <div className="modal-background"></div>
        <div className="modal-card">
            <header className="modal-card-head">
            <p className="modal-card-title">Modal title</p>
            <button className="delete" aria-label="close" onClick={closeModal}></button>
            </header>  
            <form onSubmit={formData}>          
                <section className="modal-card-body">
                    <div className="field">
                        <label className="label">Transaction Type</label>
                        <div className="control">
                            <div className="select is-fullwidth">
                                <select name="transactionType" defaultValue="SENT">
                                    <option value="SENT">Money Sent (Expense)</option>
                                    <option value="RECEIVED">Money Received (Income)</option>
                                </select>
                            </div>
                        </div>
                    </div>

                    {/* Amount */}
                    <div className="field">
                        <label className="label">Amount (₹)</label>
                        <div className="control">
                            <input
                                className="input"
                                type="number"
                                name="amount"
                                placeholder="Enter amount"
                                min="0.01"
                                step="0.01"
                                required
                            />
                        </div>
                    </div>

                    {/* Category */}
                    <div className="field">
                        <label className="label">Category</label>
                        <div className="control">
                            <div className="select is-fullwidth">
                                <select name="category" defaultValue="" required>
                                    <option value="" disabled>Select category</option>
                                    <option value="Food">Food</option>
                                    <option value="Rent">Rent</option>
                                    <option value="EMI">EMI</option>
                                    <option value="Travel">Travel</option>
                                    <option value="Shopping">Shopping</option>
                                    <option value="Salary">Salary</option>
                                    <option value="Fashion">Fashion</option>
                                    <option value="Other">Other</option>
                                </select>
                            </div>
                        </div>
                    </div>

                    {/* Payment Method */}
                    <div className="field">
                        <label className="label">Payment Method</label>
                        <div className="control">
                            <div className="select is-fullwidth">
                                <select name="paymentMethod" defaultValue="" required>
                                    <option value="" disabled>Select payment method</option>
                                    <option value="UPI">UPI</option>
                                    <option value="Cash">Cash</option>
                                    <option value="Card">Card</option>
                                    <option value="Bank Transfer">Bank Transfer</option>
                                </select>
                            </div>
                        </div>
                    </div>

                    {/* Date */}
                    <div className="field">
                        <label className="label">Date</label>
                        <div className="control">
                            <input
                                className="input"
                                type="date"
                                name="expenseDate"
                                defaultValue={new Date().toLocaleDateString("en-CA")}
                                max={new Date().toLocaleDateString("en-CA")}
                                required
                            />
                        </div>
                    </div>

                    {/* Time */}
                    <div className="field">
                        <label className="label">Time</label>
                        <div className="control">
                            <input
                                className="input"
                                type="time"
                                name="expenseTime"
                                required
                            />
                        </div>
                    </div>

                    {/* Description */}
                    <div className="field">
                        <label className="label">Description</label>
                        <div className="control">
                            <textarea
                                className="textarea"
                                name="description"
                                placeholder="What was this transaction for?"
                                rows="3"
                            ></textarea>
                        </div>
                    </div>

                    {/* Receipt */}
                    <div className="field">
                        <label className="label">Bill / Receipt (Optional)</label>
                        <div className="control">
                            <input
                                className="input"
                                type="file"
                                name="receipt"
                                accept="image/*,.pdf"
                            />
                        </div>
                        <p className="help">
                            Upload an image or PDF of your receipt.
                        </p>
                    </div>
                </section>
            <footer className="modal-card-foot">
            <div className="buttons">
                <button className="button is-success" type='submit'>Save changes</button>
                <button className="button">Cancel</button>
            </div>
            </footer>
             </form>
        </div>
        </div> 
    );
}
export default EditExpense;