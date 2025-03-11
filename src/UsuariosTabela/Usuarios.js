import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import './UsuariosTabela.css';

function UsuariosTabela() {
  const [users, setUsers] = useState(JSON.parse(localStorage.getItem('users')) || []);
  const [newEmail, setNewEmail] = useState('');
  const [newPassword, setNewPassword] = useState('');
  const [currentPage, setCurrentPage] = useState(1);
  const [editingUserIndex, setEditingUserIndex] = useState(null);
  const [editEmail, setEditEmail] = useState('');
  const [editPassword, setEditPassword] = useState('');
  const itemsPerPage = 10;
  const navigate = useNavigate();

  const handleAddUser = (e) => {
    e.preventDefault();
    if (!newEmail || !newPassword) {
      alert('Por favor, preencha email e senha.');
      return;
    }
    const newUser = { email: newEmail, password: newPassword };
    const updatedUsers = [...users, newUser];
    setUsers(updatedUsers);
    localStorage.setItem('users', JSON.stringify(updatedUsers));
    setNewEmail('');
    setNewPassword('');
    alert('Usuário adicionado com sucesso!');
  };

  const handleLogout = () => {
    navigate('/', { replace: true });
  };

  const handleEdit = (index) => {
    setEditingUserIndex(index);
    setEditEmail(users[index].email);
    setEditPassword(users[index].password);
  };

  const handleSaveEdit = () => {
    if (!editEmail || !editPassword) {
      alert('Por favor, preencha email e senha.');
      return;
    }
    const updatedUsers = users.map((user, i) =>
      i === editingUserIndex ? { email: editEmail, password: editPassword } : user
    );
    setUsers(updatedUsers);
    localStorage.setItem('users', JSON.stringify(updatedUsers));
    setEditingUserIndex(null);
    setEditEmail('');
    setEditPassword('');
    alert('Usuário atualizado com sucesso!');
  };

  const handleCancelEdit = () => {
    setEditingUserIndex(null);
    setEditEmail('');
    setEditPassword('');
  };

  const handleDelete = (index) => {
    if (window.confirm('Tem certeza que deseja excluir este usuário?')) {
      const updatedUsers = users.filter((_, i) => i !== index);
      setUsers(updatedUsers);
      localStorage.setItem('users', JSON.stringify(updatedUsers));
      alert('Usuário excluído com sucesso!');
    }
  };
  

  const totalPages = Math.ceil(users.length / itemsPerPage);
  const startIndex = (currentPage - 1) * itemsPerPage;
  const endIndex = startIndex + itemsPerPage;
  const currentUsers = users.slice(startIndex, endIndex);

  const goToPage = (page) => {
    if (page >= 1 && page <= totalPages) {
      setCurrentPage(page);
    }
  };

  return (
    <div>
      <h2>Lista de Usuários</h2>
      <form onSubmit={handleAddUser}>
        <div>
          <label>Email: </label>
          <input
            type="email"
            placeholder="Digite o email"
            value={newEmail}
            onChange={(e) => setNewEmail(e.target.value)}
          />
        </div>
        <div>
          <label>Senha: </label>
          <input
            type="password"
            placeholder="Digite a senha"
            value={newPassword}
            onChange={(e) => setNewPassword(e.target.value)}
          />
        </div>
        <button type="submit">Adicionar Usuário</button>
      </form>

      {users.length === 0 ? (
        <p>Nenhum usuário cadastrado ainda.</p>
      ) : (
        <>
          <table>
            <thead>
              <tr>
                <th>Email</th>
                <th>Senha</th>
                <th>Ações</th>
              </tr>
            </thead>
            <tbody>
              {currentUsers.map((user, index) => (
                <tr key={startIndex + index}>
                  {editingUserIndex === startIndex + index ? (
                    <>
                      <td>
                        <input
                          type="email"
                          value={editEmail}
                          onChange={(e) => setEditEmail(e.target.value)}
                        />
                      </td>
                      <td>
                        <input
                          type="password"
                          value={editPassword}
                          onChange={(e) => setEditPassword(e.target.value)}
                        />
                      </td>
                      <td>
                        <button onClick={handleSaveEdit}>Salvar</button>
                        <button onClick={handleCancelEdit}>Cancelar</button>
                      </td>
                    </>
                  ) : (
                    <>
                      <td>{user.email}</td>
                      <td>{user.password}</td>
                      <td>
                        <button onClick={() => handleEdit(startIndex + index)}>Editar</button>
                        <button onClick={() => handleDelete(startIndex + index)}>Excluir</button>
                      </td>
                    </>
                  )}
                </tr>
              ))}
            </tbody>
          </table>
          <div className="pagination">
            <button
              onClick={() => goToPage(currentPage - 1)}
              disabled={currentPage === 1}
            >
              Anterior
            </button>
            <span>Página {currentPage} de {totalPages}</span>
            <button
              onClick={() => goToPage(currentPage + 1)}
              disabled={currentPage === totalPages}
            >
              Próxima
            </button>
          </div>
        </>
      )}
      <button onClick={handleLogout}>Voltar ao Login</button>
    </div>
  );
}

export default UsuariosTabela;