document.addEventListener("DOMContentLoaded", function () {
  const currentPath = window.location.pathname;
  const navLinks = document.querySelectorAll(".navbar-nav .nav-link");

  navLinks.forEach((link) => {
    if (link.getAttribute("href") === currentPath) {
      link.classList.add("active");
    }
  });

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
  // Handle select button click
  const selectButtons = document.querySelectorAll(".select-btn");
  if (selectButtons) {
    selectButtons.forEach((button) => {
      button.addEventListener("click", function () {
        const row = this.closest("tr");
        if (row) {
          const id = this.getAttribute("data-id");
          const formType = this.getAttribute("data-form-type");
          // Common fields for all forms
          const date = row.querySelector(".date");
          const name = row.querySelector(".name");
          const company = row.querySelector(".company");
          const reasonForVisit = row.querySelector(".reasonForVisit");
          const timeIn = row.querySelector(".timeIn");
          const timeOut = row.querySelector(".timeOut");

          const setInputValue = (id, value) => {
            const element = document.getElementById(id);
            if (element) {
              element.value = value;
            }
          };

          // Specific fields for each form
          if (formType === "visitor") {
            const visitorCardNumber = row.querySelector(".visitorCardNumber");
            const visitorSignature = this.getAttribute("data-signature");
            // Populate Visitor Log form
            setInputValue("visitorId", id);
            setInputValue("visitorDate", date ? date.innerText : "");
            setInputValue("visitorName", name ? name.innerText : "");
            setInputValue("visitorCompany", company ? company.innerText : "");
            setInputValue(
              "visitorReasonForVisit",
              reasonForVisit ? reasonForVisit.innerText : ""
            );
            setInputValue(
              "visitorCardNumber",
              visitorCardNumber ? visitorCardNumber.innerText : ""
            );
            setInputValue("visitorTimeIn", timeIn ? timeIn.innerText : "");
            setInputValue("visitorTimeOut", timeOut ? timeOut.innerText : "");

            if (visitorSignaturePad) {
              visitorSignaturePad.clear();
              if (visitorSignature) {
                visitorSignaturePad.fromDataURL(visitorSignature);
              }
            }
          } else if (formType === "serverRoom") {
            const accompaniedBy = row.querySelector(".accompaniedBy");
            const visitorSignature = this.getAttribute("data-signature");
            // Populate Server Room Log form
            setInputValue("serverRoomId", id);
            setInputValue("serverRoomDate", date ? date.innerText : "");
            setInputValue("visitorName", name ? name.innerText : "");
            setInputValue("visitorCompany", company ? company.innerText : "");
            setInputValue(
              "visitorReasonForVisit",
              reasonForVisit ? reasonForVisit.innerText : ""
            );
            setInputValue("visitorTimeIn", timeIn ? timeIn.innerText : "");
            setInputValue("visitorTimeOut", timeOut ? timeOut.innerText : "");
            setInputValue(
              "serverRoomAccompaniedBy",
              accompaniedBy ? accompaniedBy.innerText : ""
            );
            if (visitorSignaturePad) {
              console.log(visitorSignaturePad);
              visitorSignaturePad.clear();
              if (visitorSignature) {
                console.log(visitorSignature);
                visitorSignaturePad.fromDataURL(visitorSignature);
              }
            }
          } else if (formType === "itIntervention") {
            // Existing IT Intervention form fields
            const incidentId = row.querySelector(".incidentid");
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
            const delegatedStaffTitle = row.querySelector(
              ".delegatedstafftitle"
            );
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

            // Populate IT Intervention form
            setInputValue("interventionId", id);
            setInputValue("incidentId", incidentId ? incidentId.innerText : "");
            setInputValue("date", date ? date.innerText : "");
            setInputValue("companyName", company ? company.innerText : "");
            setInputValue(
              "contactPerson",
              contactPerson ? contactPerson.innerText : ""
            );
            setInputValue("phoneOrFax", phoneOrFax ? phoneOrFax.innerText : "");
            setInputValue(
              "workStarted",
              workStarted
                ? new Date(workStarted.innerText).toISOString().slice(0, 16)
                : ""
            );
            setInputValue(
              "workCompleted",
              workCompleted
                ? new Date(workCompleted.innerText).toISOString().slice(0, 16)
                : ""
            );
            document.getElementById("billable").checked = billable
              ? billable.innerText === "on"
              : false;
            document.getElementById("warranty").checked = warranty
              ? warranty.innerText === "on"
              : false;
            document.getElementById("maintenance").checked = maintenance
              ? maintenance.innerText === "on"
              : false;
            setInputValue(
              "hardwareSoftwareName",
              hardwareSoftwareName ? hardwareSoftwareName.innerText : ""
            );
            setInputValue(
              "natureOfIntervention",
              natureOfIntervention ? natureOfIntervention.innerText : ""
            );
            setInputValue(
              "actionsTaken",
              actionsTaken ? actionsTaken.innerText : ""
            );
            setInputValue(
              "delegatedStaffName",
              delegatedStaffName ? delegatedStaffName.innerText : ""
            );
            setInputValue(
              "delegatedStaffTitle",
              delegatedStaffTitle ? delegatedStaffTitle.innerText : ""
            );
            setInputValue(
              "delegatedStaffDate",
              delegatedStaffDate ? delegatedStaffDate.innerText : ""
            );
            setInputValue(
              "providerName",
              providerName ? providerName.innerText : ""
            );
            setInputValue(
              "providerTitle",
              providerTitle ? providerTitle.innerText : ""
            );
            setInputValue(
              "providerDate",
              providerDate ? providerDate.innerText : ""
            );

            // Handle signatures
            if (delegatedStaffSignaturePad) {
              delegatedStaffSignaturePad.clear();
              if (delegatedStaffSignature) {
                delegatedStaffSignaturePad.fromDataURL(delegatedStaffSignature);
              }
            }
            if (providerSignaturePad) {
              providerSignaturePad.clear();
              if (providerSignature) {
                providerSignaturePad.fromDataURL(providerSignature);
              }
            }
          }
        }
      });
    });
  } else {
    console.log("Select buttons not found");
  }

  // Visitor Log Form
  const visitorDateInput = document.getElementById("date");
  const visitorTimeInInput = document.getElementById("timeIn");

  autoPopulateDateTime(visitorDateInput, visitorTimeInInput);

  const visitorCanvas = document.createElement("canvas");
  visitorCanvas.height = 200; // Set height as needed

  const visitorSignaturePadContainer = document.getElementById("signature-pad");
  if (visitorSignaturePadContainer) {
    visitorSignaturePadContainer.appendChild(visitorCanvas);
    const parentWidth = visitorSignaturePadContainer.offsetWidth;
    visitorCanvas.setAttribute("width", parentWidth);
  }

  const visitorSignaturePad = new SignaturePad(visitorCanvas);

  const clearSignatureButton = document.getElementById("clear-signature");
  if (clearSignatureButton) {
    clearSignatureButton.addEventListener("click", function () {
      visitorSignaturePad.clear();
    });
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

  // IT Intervention Form
  const itDateInput = document.getElementById("date");
  const itWorkStartedInput = document.getElementById("workStarted");

  autoPopulateDateTime(itDateInput, itWorkStartedInput);

  // Initialize signature pads
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
    delegatedStaffCanvas.height = 200; // Set height as needed
    delegatedStaffSignaturePadContainer.appendChild(delegatedStaffCanvas);

    // Set the width of the canvas to the width of its parent container
    const parentWidth = delegatedStaffSignaturePadContainer.offsetWidth;
    delegatedStaffCanvas.setAttribute("width", parentWidth);

    delegatedStaffSignaturePad = new SignaturePad(delegatedStaffCanvas);

    document
      .getElementById("clearDelegatedStaffSignature")
      .addEventListener("click", function () {
        delegatedStaffSignaturePad.clear();
      });
  }

  if (providerSignaturePadContainer) {
    const providerCanvas = document.createElement("canvas");
    providerCanvas.height = 200; // Set height as needed
    providerSignaturePadContainer.appendChild(providerCanvas);

    // Set the width of the canvas to the width of its parent container
    const parentWidth = providerSignaturePadContainer.offsetWidth;
    providerCanvas.setAttribute("width", parentWidth);

    providerSignaturePad = new SignaturePad(providerCanvas);

    document
      .getElementById("clearProviderSignature")
      .addEventListener("click", function () {
        providerSignaturePad.clear();
      });
  }

  // Function to show loading indicator
  function showLoading() {
    Swal.fire({
      title: "Submitting...",
      allowOutsideClick: false,
      didOpen: () => {
        Swal.showLoading();
      },
    });
  }

  // Function to show success message
  function showSuccess(message) {
    Swal.fire({
      icon: "success",
      title: "Success!",
      text: message,
      timer: 2000,
      showConfirmButton: false,
    }).then(() => {
      window.location.reload();
    });
  }

  // Function to show error message
  function showError(message) {
    Swal.fire({
      icon: "error",
      title: "Oops...",
      text: message,
    });
  }

  // Generic form submission function
  function handleFormSubmission(form, url, method, formData) {
    showLoading();

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
        return response.text();
      })
      .then((text) => {
        // Try to parse the response as JSON, but don't fail if it's empty or not valid JSON
        try {
          JSON.parse(text);
        } catch (e) {
          // If parsing fails, it's okay, we'll just use the text as is
        }
        showSuccess("Form submitted successfully!");
      })
      .catch((error) => {
        console.error("Error submitting form:", error);
        showError("Error submitting form. Please try again.");
      });
  }

  // Visitor Log Form
  const visitorForm = document.getElementById("visitor-form");
  if (visitorForm) {
    visitorForm.addEventListener("submit", function (event) {
      event.preventDefault();
      const formData = new FormData(event.target);
      formData.append("signature", visitorSignaturePad.toDataURL());
      const visitorId = formData.get("id");
      let url = visitorId
        ? `/visitor-log/update/${visitorId}`
        : "/visitor-log/add";
      let method = visitorId ? "PUT" : "POST";
      handleFormSubmission(visitorForm, url, method, formData);
    });
  }

  // Server Room Form
  const serverRoomForm = document.getElementById("serverRoom-form");
  if (serverRoomForm) {
    serverRoomForm.addEventListener("submit", function (event) {
      event.preventDefault();
      const formData = new FormData(event.target);
      formData.append("signature", visitorSignaturePad.toDataURL());
      const serverRoomId = formData.get("id");
      let url = serverRoomId
        ? `/server-room/update/${serverRoomId}`
        : "/server-room/add";
      let method = serverRoomId ? "PUT" : "POST";
      handleFormSubmission(serverRoomForm, url, method, formData);
    });
  }

  // IT Intervention Form
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
      const interventionId = formData.get("id");
      let url = interventionId
        ? `/it-intervention/update/${interventionId}`
        : "/it-intervention/add";
      let method = interventionId ? "PUT" : "POST";
      handleFormSubmission(itInterventionForm, url, method, formData);
    });
  }

  function initializeList(elementId, options, tableId) {
    const listElement = document.getElementById(elementId);
    if (listElement) {
      // Check if there are any rows in the table body
      const tableRows = listElement.querySelectorAll("tbody tr");

      if (tableRows.length > 0) {
        // If there are rows, initialize List.js
        const list = new List(elementId, options);

        list.on("searchComplete", function () {
          const table = document.getElementById(tableId);
          const searchInput = listElement.querySelector(".search");
          if (
            searchInput.value.trim() !== "" &&
            list.searched &&
            list.matchingItems.length > 0
          ) {
            table.classList.remove("hidden");
          } else {
            table.classList.add("hidden");
          }
        });

        // Add event listener for the "Delete All" button
        const deleteAllButton = listElement.querySelector(".delete-all");
        if (deleteAllButton) {
          deleteAllButton.addEventListener("click", function () {
            list.clear();
            document.getElementById(tableId).classList.add("hidden");
          });
        }
      } else {
        // If there are no rows, hide the table and show a message
        const table = document.getElementById(tableId);
        table.classList.add("hidden");

        const noDataMessage = document.createElement("p");
        noDataMessage.textContent = "No logs available.";
        noDataMessage.className = "text-center mt-3";
        listElement.appendChild(noDataMessage);

        // Disable search input and delete all button
        const searchInput = listElement.querySelector(".search");
        const deleteAllButton = listElement.querySelector(".delete-all");
        if (searchInput) searchInput.disabled = true;
        if (deleteAllButton) deleteAllButton.disabled = true;
      }
    }
  }
  const visitorOptions = {
    valueNames: ["name", "visitorCardNumber"],
    listClass: "list",
  };
  initializeList("visitor-logs", visitorOptions, "visitor-logs-table");

  // Initialize server room logs
  const serverOptions = {
    valueNames: ["name"],
    listClass: "list",
  };
  initializeList(
    "serverroom-logs",
    serverOptions,
    "server-room-visitor-logs-table"
  );

  // Initialize IT intervention logs
  const itOptions = {
    valueNames: ["incidentid", "company"],
    listClass: "list",
  };
  initializeList(
    "it-intervention-logs",
    itOptions,
    "it-intervention-logs-table"
  );
});
