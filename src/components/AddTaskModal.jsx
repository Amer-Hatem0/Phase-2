import "../styles/taskmodal.css";
export default function AddTaskModal({ onClose }) {
  return (
    <div className="modal-overlay">
      <div className="modal">
        <span className="close" onClick={onClose}>&times;</span>
        <h2 className="modal-title">Create New Task</h2>
        <form>
          <div className="form-row">
            <label>Project Title:</label>
            <select required>
              {/* Options populated dynamically */}
            </select>
          </div>
          
          <div className="form-row">
            <label>Task Name:</label>
            <input type="text" placeholder="Enter task name" required />
          </div>
          
          <div className="form-row">
            <label>Description:</label>
            <textarea placeholder="Enter task description" required></textarea>
          </div>
          
          <div className="form-row">
            <label>Assigned Student:</label>
            <select required>
              {/* Student options */}
            </select>
          </div>
          
          <div className="form-row">
            <label>Status:</label>
            <select>
              <option>In Progress</option>
              <option>Completed</option>
              <option>Pending</option>
              <option>On Hold</option>
              <option>Cancelled</option>
            </select>
          </div>
          
          <div className="form-row">
            <label>Due Date:</label>
            <input type="date" />
          </div>
          
          <button type="submit" id="addtaskBtn">Add Task</button>
        </form>
      </div>
    </div>
  );
}