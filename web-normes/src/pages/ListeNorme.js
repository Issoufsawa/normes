 {/* TABLEAU */}
      <section className="featured-section">
        <div className="container">
          <h2 className="mb-4">📋 Liste des normes archivistiques</h2>

          <input
            type="text"
            className="form-control mb-3"
            placeholder="🔍 Rechercher par titre, catégorie, mots-clés ou date"
            value={search}
            onChange={(e) => setSearch(e.target.value)}
          />

          <div className="table-responsive">
            <table className="table table-bordered table-hover table-striped">
              <thead className="table-dark">
                <tr>
                  <th>ID</th>
                  <th>Description du texte</th>
                  <th>Référence du texte</th>
                  <th>Documents concernés</th>
                  <th>Domaines</th>
                  <th>Type de texte</th>
                  <th>Domaine d'activité</th>
                  <th>Pays ou Région</th>
                  <th>Source</th>
                  <th>Fichier</th>
                  <th>Validité du texte</th>
                  <th>Actions</th>
                </tr>
              </thead>
              <tbody>
                {filteredNormes.map((n) => (
                  <tr key={n.id}>
                    <td>{n.id}</td>
                    <td>{n.description_du_texte}</td>
                    <td>{n.reference_du_texte}</td>
                    <td>{n.document_concerne}</td>
                    <td>{n.domaine}</td> 
                    <td>{n.categorie}</td>
                    <td>{n.domaine_activite}</td>
                    <td>{n.source}</td>
                    <td>{n.fichier}</td>
                    <td>{n.date_pub}</td>
                  
                   
                    <td>
                      <button
                        className="btn btn-sm btn-outline-primary me-2"
                        onClick={() => handleEdit(n)}
                      >
                        ✏️ Modifier
                      </button>
                      <button
                        className="btn btn-sm btn-outline-danger"
                        onClick={() => handleDelete(n.id)}
                      >
                        🗑️ Supprimer
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </section>