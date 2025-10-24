document.addEventListener("DOMContentLoaded", async () => {
  // Harga default (bisa diambil dari API harga emas dunia)
  let hargaEmas = 1200000; // Rp per gram
  let hargaPerak = 15000;  // Rp per gram

  // Set harga otomatis ke input
  document.getElementById("hargaEmas").value = hargaEmas;
  document.getElementById("hargaPerak").value = hargaPerak;

  const emasInput = document.getElementById("emas");
  const perakInput = document.getElementById("perak");
  const uangInput = document.getElementById("uang");
  const hutangInput = document.getElementById("hutang");
  const totalHartaInput = document.getElementById("totalHarta");

  function hitungTotal() {
    const emas = parseFloat(emasInput.value) || 0;
    const perak = parseFloat(perakInput.value) || 0;
    const uang = parseFloat(uangInput.value) || 0;
    const hutang = parseFloat(hutangInput.value) || 0;

    const total =
      emas * hargaEmas +
      perak * hargaPerak +
      uang -
      hutang;

    totalHartaInput.value = total.toLocaleString("id-ID");
    return total;
  }

  // Hitung otomatis ketika user isi input
  [emasInput, perakInput, uangInput, hutangInput].forEach(input =>
    input.addEventListener("input", hitungTotal)
  );

  // Submit kalkulasi zakat
  document.getElementById("zakatForm").addEventListener("submit", (e) => {
    e.preventDefault();

    const sudahSetahun = document.getElementById("sudahSetahun").value;
    const total = hitungTotal();
    const nisab = 85 * hargaEmas; // Nisab 85 gram emas
    const hasilCard = document.getElementById("hasilCard");

    if (sudahSetahun === "belum") {
      hasilCard.style.display = "block";
      document.getElementById("hasilStatus").textContent = "❌ Belum wajib zakat (belum 1 tahun)";
      document.getElementById("hasilZakat").textContent = "";
      document.getElementById("hasilNisab").textContent = `Nisab saat ini: Rp ${nisab.toLocaleString("id-ID")}`;
      return;
    }

    if (total >= nisab) {
      const zakat = total * 0.025;
      document.getElementById("hasilStatus").textContent = "✅ Wajib zakat";
      document.getElementById("hasilZakat").textContent = `Jumlah zakat yang harus dibayarkan: Rp ${zakat.toLocaleString("id-ID")}`;
    } else {
      document.getElementById("hasilStatus").textContent = "❌ Belum wajib zakat (belum mencapai nisab)";
      document.getElementById("hasilZakat").textContent = "";
    }

    document.getElementById("hasilNisab").textContent = `Nisab saat ini: Rp ${nisab.toLocaleString("id-ID")}`;
    hasilCard.style.display = "block";
  });
});