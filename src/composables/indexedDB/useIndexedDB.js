export function openDb() {
  return new Promise((resolve, reject) => {
    const request = indexedDB.open("myMedicineDB", 2);

    request.onupgradeneeded = (e) => {
      const db = e.target.result;
      if (!db.objectStoreNames.contains("medication")) {
        db.createObjectStore("medication", { keyPath: "id", autoIncrement: true });
      }
      if (!db.objectStoreNames.contains("medicationLog")) {
        db.createObjectStore("medicationLog", { keyPath: "id", autoIncrement: true });
      }
    };

    request.onsuccess = (e) => {
      resolve(e.target.result);
    };

    request.onerror = (e) => {
      reject(e.target.error);
    };
  });
}

export function addItem(db, table, data) {
  return new Promise((resolve, reject) => {
    const tx = db.transaction(table, "readwrite");
    const store = tx.objectStore(table);
    const request = store.add(data);

    request.onsuccess = (e) => {
      resolve({ success: true, id: e.target.result });
    };

    request.onerror = (e) => {
      reject({ success: false, error: e.target.error });
    };
  });
}

export function listItem(db, table) {
  return new Promise((resolve, reject) => {
    const tx = db.transaction(table, "readonly");
    const store = tx.objectStore(table);
    const request = store.getAll();

    request.onsuccess = (e) => {
      resolve(e.target.result.filter(item => item.status !== 'disabled'));
    };

    request.onerror = (e) => {
      reject(e.target.error);
    };
  });
}

export function updateByIdMedication(db, table, idMedication, updatedData) {
  return new Promise((resolve, reject) => {
    const tx = db.transaction(table, "readwrite");
    const store = tx.objectStore(table);
    const request = store.getAll();

    request.onsuccess = (e) => {
      const allItems = e.target.result;

      // Filtra os registros que têm o mesmo idMedication
      const itemsToUpdate = allItems.filter(item => item.idMedication === idMedication);

      if (itemsToUpdate.length === 0) {
        resolve({ updated: 0, message: "Not found." });
        return;
      }

      let updatedCount = 0;

      itemsToUpdate.forEach(item => {
        // Atualiza os campos com base em updatedData
        const updatedItem = { ...item, ...updatedData };
        const updateRequest = store.put(updatedItem);

        updateRequest.onsuccess = () => {
          updatedCount++;
          // Quando todos forem atualizados, resolvemos a Promise
          if (updatedCount === itemsToUpdate.length) {
            resolve({ updated: updatedCount, message: "Registros atualizados com sucesso!" });
          }
        };

        updateRequest.onerror = (err) => {
          reject(err.target.error);
        };
      });
    };

    request.onerror = (err) => {
      reject(err.target.error);
    };
  });
}

export function updateByIdMedicationLog(db, table, idMedication, updatedData) {
  return new Promise((resolve, reject) => {
    const tx = db.transaction(table, "readwrite");
    const store = tx.objectStore(table);
    const request = store.getAll();

    request.onsuccess = (e) => {
      const allItems = e.target.result;

      // Filtra os registros que têm o mesmo idMedication
      const itemsToUpdate = allItems.filter(item => item.idMedication === idMedication && item.date === updatedData.date && item.time === updatedData.time);

      if (itemsToUpdate.length === 0) {
        resolve({ updated: 0, message: "Not found." });
        return;
      }

      let updatedCount = 0;

      itemsToUpdate.forEach(item => {
        // Atualiza os campos com base em updatedData
        const updatedItem = { ...item, ...updatedData };
        const updateRequest = store.put(updatedItem);

        updateRequest.onsuccess = () => {
          updatedCount++;
          // Quando todos forem atualizados, resolvemos a Promise
          if (updatedCount === itemsToUpdate.length) {
            resolve({ updated: updatedCount, message: "Registros atualizados com sucesso!" });
          }
        };

        updateRequest.onerror = (err) => {
          reject(err.target.error);
        };
      });
    };

    request.onerror = (err) => {
      reject(err.target.error);
    };
  });
}

export function updateStatusByIdMedication(db, table, idMedication, newStatus) {
  return new Promise((resolve, reject) => {
    const tx = db.transaction(table, "readwrite");
    const store = tx.objectStore(table);
    const request = store.getAll();

    request.onsuccess = (e) => {
      const allItems = e.target.result;

      // Filtra os registros que têm o mesmo idMedication
      const itemsToUpdate = allItems.filter(item => item.id === idMedication);

      if (itemsToUpdate.length === 0) {
        resolve({ updated: 0, message: "Not found." });
        return;
      }

      let updatedCount = 0;

      itemsToUpdate.forEach(item => {
        // Atualiza somente o campo "status"
        const updatedItem = { ...item, status: newStatus };

        const updateRequest = store.put(updatedItem);

        updateRequest.onsuccess = () => {
          updatedCount++;
          if (updatedCount === itemsToUpdate.length) {
            resolve({ updated: updatedCount, message: "Status atualizado com sucesso!" });
          }
        };

        updateRequest.onerror = (err) => {
          reject(err.target.error);
        };
      });
    };

    request.onerror = (err) => {
      reject(err.target.error);
    };
  });
}



export function getMedicationById(db, table, id) {
  return new Promise((resolve, reject) => {
    const tx = db.transaction(table, "readonly");
    const store = tx.objectStore(table);
    const request = store.get(id);

    request.onsuccess = (e) => {
      const item = e.target.result;

      if (!item) {
        resolve({ success: false });
      } else {
        resolve({ success: true, item });
      }
    };

    request.onerror = (err) => {
      reject(err.target.error);
    };
  });
}





