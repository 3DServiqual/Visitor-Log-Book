document.addEventListener("DOMContentLoaded", function () {
  // Common function to auto-populate date and time
  function autoPopulateDateTime(dateInput, timeInput) {
    if (dateInput) {
      dateInput.addEventListener("focus", function () {
        const today = new Date();
        const formattedDate = today.toISOString().split("T")[0];
        dateInput.value = formattedDate;
      });
    }

    if (timeInput) {
      timeInput.addEventListener("focus", function () {
        const now = new Date();
        const hours = String(now.getHours()).padStart(2, "0");
        const minutes = String(now.getMinutes()).padStart(2, "0");
        const formattedTime = `${hours}:${minutes}`;
        timeInput.value = formattedTime;
      });
    }
  }

  // Add CSV export functionality
  const exportCsvButton = document.createElement("button");
  exportCsvButton.textContent = "Export CSV";
  exportCsvButton.className = "btn btn-secondary mb-3 ms-2";
  exportCsvButton.addEventListener("click", exportToCsv);

  const searchInput = document.querySelector(".search");
  if (searchInput) {
    searchInput.parentNode.insertBefore(
      exportCsvButton,
      searchInput.nextSibling
    );
  }

  function exportToCsv() {
    const table = document.getElementById("it-intervention-logs-table");
    if (!table) {
      console.error("Table not found");
      return;
    }

    const rows = table.querySelectorAll("tbody tr");
    const headers = Array.from(table.querySelectorAll("thead th")).map(
      (th) => th.textContent
    );

    let csvContent = headers.join(",") + "\n";

    rows.forEach((row) => {
      const rowData = Array.from(row.children)
        .map((cell) => {
          let content = cell.textContent.replace(/"/g, '""');
          return `"${content}"`;
        })
        .join(",");
      csvContent += rowData + "\n";
    });

    const blob = new Blob([csvContent], { type: "text/csv;charset=utf-8;" });
    const link = document.createElement("a");
    if (link.download !== undefined) {
      const url = URL.createObjectURL(blob);
      link.setAttribute("href", url);
      link.setAttribute("download", "it_interventions.csv");
      link.style.visibility = "hidden";
      document.body.appendChild(link);
      link.click();
      document.body.removeChild(link);
    }
  }

  // Visitor Log Form
  const visitorDateInput = document.getElementById("date");
  const visitorTimeInInput = document.getElementById("timeIn");

  autoPopulateDateTime(visitorDateInput, visitorTimeInInput);

  const visitorCanvas = document.createElement("canvas");
  visitorCanvas.width = 500;
  visitorCanvas.height = 200;

  const visitorSignaturePadContainer = document.getElementById("signature-pad");
  if (visitorSignaturePadContainer) {
    visitorSignaturePadContainer.appendChild(visitorCanvas);
  }

  const visitorSignaturePad = new SignaturePad(visitorCanvas);

  const clearSignatureButton = document.getElementById("clear-signature");
  if (clearSignatureButton) {
    clearSignatureButton.addEventListener("click", function () {
      visitorSignaturePad.clear();
    });
  }

  const visitorForm = document.getElementById("visitor-form");
  if (visitorForm) {
    visitorForm.addEventListener("submit", function (event) {
      event.preventDefault();

      const formData = new FormData(event.target);
      formData.append("signature", visitorSignaturePad.toDataURL());

      fetch("/visitor-log/add", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(Object.fromEntries(formData)),
      })
        .then((response) => {
          if (!response.ok) {
            throw new Error("Network response was not ok");
          }
          return response.json();
        })
        .then((data) => {
          window.location.reload();
        })
        .catch((error) => {
          console.error("Error submitting visitor form:", error);
          alert("Error submitting visitor form");
        });
    });
  }

  const visitorOptions = {
    valueNames: ["name"],
  };

  const visitorListElement = document.getElementById("visitor-logs");
  if (visitorListElement) {
    const visitorList = new List("visitor-logs", visitorOptions);

    visitorList.on("searchComplete", function () {
      const table = document.getElementById("visitor-logs-table");
      const searchInput = document.querySelector(".search");
      if (searchInput.value.trim() !== "" && !visitorList.filtered) {
        table.classList.remove("hidden");
      } else {
        table.classList.add("hidden");
      }
    });
  }

  // Handle select button click
  const selectButtons = document.querySelectorAll(".select-btn");
  if (selectButtons) {
    selectButtons.forEach((button) => {
      button.addEventListener("click", function () {
        const row = this.closest("tr");
        if (row) {
          const incidentId = row.querySelector(".incidentid");
          const date = row.querySelector(".date");
          const companyName = row.querySelector(".company");
          const contactPerson = row.querySelector(".contactperson");
          const phoneOrFax = row.querySelector(".phone");
          const workStarted = row.querySelector(".workstarted");
          const workCompleted = row.querySelector(".workcompleted");
          const billable = row.querySelector(".billable");
          const warranty = row.querySelector(".warranty");
          const maintenance = row.querySelector(".maintenance");
          const hardwareSoftwareName = row.querySelector(".hardwaresoftware");
          const natureOfIntervention = row.querySelector(
            ".natureofintervention"
          );
          const actionsTaken = row.querySelector(".actionstaken");
          const delegatedStaffName = row.querySelector(".delegatedstaffname");
          const delegatedStaffTitle = row.querySelector(".delegatedstafftitle");
          const delegatedStaffDate = row.querySelector(".delegatedstaffdate");
          const providerName = row.querySelector(".providername");
          const providerTitle = row.querySelector(".providertitle");
          const providerDate = row.querySelector(".providerdate");
          const delegatedStaffSignature = this.getAttribute(
            "data-delegated-staff-signature"
          );
          const providerSignature = this.getAttribute(
            "data-provider-signature"
          );
          const incidentIdInput = document.getElementById("incidentId");
          const dateInput = document.getElementById("date");
          const companyNameInput = document.getElementById("companyName");
          const contactPersonInput = document.getElementById("contactPerson");
          const phoneOrFaxInput = document.getElementById("phoneOrFax");
          const workStartedInput = document.getElementById("workStarted");
          const workCompletedInput = document.getElementById("workCompleted");
          const billableInput = document.getElementById("billable");
          const warrantyInput = document.getElementById("warranty");
          const maintenanceInput = document.getElementById("maintenance");
          const hardwareSoftwareNameInput = document.getElementById(
            "hardwareSoftwareName"
          );
          const natureOfInterventionInput = document.getElementById(
            "natureOfIntervention"
          );
          const actionsTakenInput = document.getElementById("actionsTaken");
          const delegatedStaffNameInput =
            document.getElementById("delegatedStaffName");
          const delegatedStaffTitleInput = document.getElementById(
            "delegatedStaffTitle"
          );
          const delegatedStaffDateInput =
            document.getElementById("delegatedStaffDate");
          const providerNameInput = document.getElementById("providerName");
          const providerTitleInput = document.getElementById("providerTitle");
          const providerDateInput = document.getElementById("providerDate");

          if (incidentIdInput) {
            incidentIdInput.value = incidentId ? incidentId.innerText : "";
          }
          if (dateInput) {
            dateInput.value = date ? date.innerText : "";
          }
          if (companyNameInput) {
            companyNameInput.value = companyName ? companyName.innerText : "";
          }
          if (contactPersonInput) {
            contactPersonInput.value = contactPerson
              ? contactPerson.innerText
              : "";
          }
          if (phoneOrFaxInput) {
            phoneOrFaxInput.value = phoneOrFax ? phoneOrFax.innerText : "";
          }
          if (workStartedInput) {
            workStartedInput.value = workStarted
              ? new Date(workStarted.innerText).toISOString().slice(0, 16)
              : "";
          }
          if (workCompletedInput) {
            workCompletedInput.value = workCompleted
              ? new Date(workCompleted.innerText).toISOString().slice(0, 16)
              : "";
          }
          if (billableInput) {
            billableInput.checked = billable
              ? billable.innerText === "1"
              : false;
          }
          if (warrantyInput) {
            warrantyInput.checked = warranty
              ? warranty.innerText === "1"
              : false;
          }
          if (maintenanceInput) {
            maintenanceInput.checked = maintenance
              ? maintenance.innerText === "1"
              : false;
          }
          if (hardwareSoftwareNameInput) {
            hardwareSoftwareNameInput.value = hardwareSoftwareName
              ? hardwareSoftwareName.innerText
              : "";
          }
          if (natureOfInterventionInput) {
            natureOfInterventionInput.value = natureOfIntervention
              ? natureOfIntervention.innerText
              : "";
          }
          if (actionsTakenInput) {
            actionsTakenInput.value = actionsTaken
              ? actionsTaken.innerText
              : "";
          }
          if (delegatedStaffNameInput) {
            delegatedStaffNameInput.value = delegatedStaffName
              ? delegatedStaffName.innerText
              : "";
          }
          if (delegatedStaffTitleInput) {
            delegatedStaffTitleInput.value = delegatedStaffTitle
              ? delegatedStaffTitle.innerText
              : "";
          }
          if (delegatedStaffDateInput) {
            delegatedStaffDateInput.value = delegatedStaffDate
              ? delegatedStaffDate.innerText
              : "";
          }
          if (providerNameInput) {
            providerNameInput.value = providerName
              ? providerName.innerText
              : "";
          }
          if (providerTitleInput) {
            providerTitleInput.value = providerTitle
              ? providerTitle.innerText
              : "";
          }
          if (providerDateInput) {
            providerDateInput.value = providerDate
              ? providerDate.innerText
              : "";
          }
          // Clear previous signatures before loading new ones
          if (delegatedStaffSignaturePad) {
            delegatedStaffSignaturePad.clear();
          }
          if (providerSignaturePad) {
            providerSignaturePad.clear();
          }
          if (delegatedStaffSignaturePad && delegatedStaffSignature) {
            delegatedStaffSignaturePad.fromDataURL(delegatedStaffSignature);
          }
          if (providerSignaturePad && providerSignature) {
            providerSignaturePad.fromDataURL(providerSignature);
          }
        }
      });
    });
  } else {
    console.log("Select buttons not found");
  }

  const deleteAllButton = document.getElementById("delete-all");
  if (deleteAllButton) {
    deleteAllButton.addEventListener("click", function () {
      if (confirm("Are you sure you want to delete all visitor logs?")) {
        fetch("/delete-all", {
          method: "DELETE",
        })
          .then((response) => {
            if (!response.ok) {
              throw new Error("Network response was not ok");
            }
            return response.json();
          })
          .then((data) => {
            window.location.reload();
          })
          .catch((error) => {
            console.error("Error deleting visitor logs:", error);
            alert("Error deleting visitor logs");
          });
      }
    });
  } else {
    console.log("Delete all button not found");
  }

  // Server Room Form
  const serverRoomForm = document.getElementById("serverRoom-form");
  if (serverRoomForm) {
    serverRoomForm.addEventListener("submit", function (event) {
      event.preventDefault();

      const formData = new FormData(event.target);
      formData.append("signature", visitorSignaturePad.toDataURL());

      fetch("/server-room/add", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(Object.fromEntries(formData)),
      })
        .then((response) => {
          if (!response.ok) {
            throw new Error("Network response was not ok");
          }
          return response.json();
        })
        .then((data) => {
          window.location.reload();
        })
        .catch((error) => {
          console.error("Error submitting visitor form:", error);
          alert("Error submitting visitor form");
        });
    });
  }

  const serverOptions = {
    valueNames: ["name"],
  };

  const serverRoomListElement = document.getElementById("serverroom-logs");
  if (serverRoomListElement) {
    const serverVisitorList = new List("serverroom-logs", serverOptions);

    serverVisitorList.on("searchComplete", function () {
      const table = document.getElementById("server-room-visitor-logs-table");
      const searchInput = document.querySelector(".search");
      if (searchInput.value.trim() !== "" && !serverVisitorList.filtered) {
        table.classList.remove("hidden");
      } else {
        table.classList.add("hidden");
      }
    });
  }

  // const deleteAllButton = document.getElementById("delete-all");
  // if (deleteAllButton) {
  //   deleteAllButton.addEventListener("click", function () {
  //     if (confirm("Are you sure you want to delete all server room logs?")) {
  //       fetch("/server-room/delete-all", {
  //         method: "DELETE",
  //       })
  //         .then((response) => {
  //           if (!response.ok) {
  //             throw new Error("Network response was not ok");
  //           }
  //           return response.json();
  //         })
  //         .then((data) => {
  //           window.location.reload();
  //         })
  //         .catch((error) => {
  //           console.error("Error deleting server room logs:", error);
  //           alert("Error deleting server room logs");
  //         });
  //     }
  //   });
  // } else {
  //   console.log("Delete all button not found");
  // }

  // IT Intervention Form
  const itDateInput = document.getElementById("date");
  const itWorkStartedInput = document.getElementById("workStarted");

  autoPopulateDateTime(itDateInput, itWorkStartedInput);

  // Initialize signature pads
  const delegatedStaffSignaturePadContainer = document.getElementById(
    "delegatedStaffSignaturePad"
  );
  const providerSignaturePadContainer = document.getElementById(
    "providerSignaturePad"
  );

  let delegatedStaffSignaturePad, providerSignaturePad;

  if (delegatedStaffSignaturePadContainer) {
    const delegatedStaffCanvas = document.createElement("canvas");
    delegatedStaffCanvas.width = 500;
    delegatedStaffCanvas.height = 200;
    delegatedStaffSignaturePadContainer.appendChild(delegatedStaffCanvas);
    delegatedStaffSignaturePad = new SignaturePad(delegatedStaffCanvas);

    document
      .getElementById("clearDelegatedStaffSignature")
      .addEventListener("click", function () {
        delegatedStaffSignaturePad.clear();
      });
  }

  if (providerSignaturePadContainer) {
    const providerCanvas = document.createElement("canvas");
    providerCanvas.width = 500;
    providerCanvas.height = 200;
    providerSignaturePadContainer.appendChild(providerCanvas);
    providerSignaturePad = new SignaturePad(providerCanvas);

    document
      .getElementById("clearProviderSignature")
      .addEventListener("click", function () {
        providerSignaturePad.clear();
      });
  }

  // Handle form submission
  const itInterventionForm = document.getElementById("it-intervention-form");

  if (itInterventionForm) {
    itInterventionForm.addEventListener("submit", function (event) {
      event.preventDefault();

      const formData = new FormData(event.target);
      if (delegatedStaffSignaturePad) {
        formData.append(
          "delegatedStaffSignature",
          delegatedStaffSignaturePad.toDataURL()
        );
      }
      if (providerSignaturePad) {
        formData.append("providerSignature", providerSignaturePad.toDataURL());
      }

      const interventionId = formData.get("id"); // Get the ID from the form data
      let url, method;

      if (interventionId) {
        url = `/it-intervention/update/${interventionId}`;
        method = "PUT";
      } else {
        url = "/it-intervention/add";
        method = "POST";
      }

      fetch(url, {
        method: method,
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(Object.fromEntries(formData)),
      })
        .then((response) => {
          if (!response.ok) {
            throw new Error("Network response was not ok");
          }
          return response.json();
        })
        .then((data) => {
          window.location.reload();
        })
        .catch((error) => {
          console.error("Error submitting IT intervention form:", error);
          alert("Error submitting IT intervention form");
        });
    });
  } else {
    console.log("Form not found");
  }

  const itOptions = {
    valueNames: ["company"],
  };

  const itInterventionListElement = document.getElementById(
    "it-intervention-logs"
  );
  if (itInterventionListElement) {
    try {
      const itVisitorList = new List("it-intervention-logs", itOptions);

      itVisitorList.on("searchComplete", function () {
        const table = document.getElementById("it-intervention-logs-table");
        const searchInput = document.querySelector(".search");
        if (
          searchInput &&
          searchInput.value.trim() !== "" &&
          !itVisitorList.filtered
        ) {
          table.classList.remove("hidden");
        } else if (table) {
          table.classList.add("hidden");
        }
      });
    } catch (error) {
      console.error(
        "Error initializing List.js for IT intervention logs:",
        error
      );
    }
  } else {
    console.error(
      "IT intervention logs element not found. Make sure the element with ID 'it-intervention-logs' exists in the DOM."
    );
  }
});
