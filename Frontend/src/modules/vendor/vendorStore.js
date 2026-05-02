const STORAGE_KEY = 'vendor-panel-state';

const todayISO = () => new Date().toISOString().slice(0, 10);

export const defaultVendorState = {
  registration: {
    fullName: '',
    businessName: '',
    email: '',
    phone: '',
    city: '',
    category: '',
    password: ''
  },
  verification: {
    phoneVerified: false,
    emailVerified: false
  },
  businessDetails: {
    description: '',
    years: '',
    teamSize: '',
    languages: [],
    serviceCities: []
  },
  services: [],
  pricing: {
    range: '',
    notes: ''
  },
  portfolio: [],
  documents: {
    idProof: false,
    gst: false,
    contract: false
  },
  bank: {
    accountName: '',
    accountNumber: '',
    ifsc: '',
    upiId: ''
  },
  subscription: {
    planId: '',
    status: 'Pending'
  },
  listingStatus: 'Draft',
  leads: [],
  quotes: [],
  bookings: [],
  availability: {
    blockedDates: [todayISO()]
  },
  analytics: {
    profileViews: 0,
    inquiries: 0,
    bookings: 0,
    conversionRate: 0
  },
  status: 'Pending',
  notifications: []
};

export const loadVendorState = () => {
  if (typeof window === 'undefined') return defaultVendorState;
  try {
    const raw = localStorage.getItem(STORAGE_KEY);
    if (!raw) return defaultVendorState;
    const parsed = JSON.parse(raw);

    // Deep merge or at least merge main sections
    return {
      ...defaultVendorState,
      ...parsed,
      registration: { ...defaultVendorState.registration, ...parsed.registration },
      verification: { ...defaultVendorState.verification, ...parsed.verification },
      businessDetails: { ...defaultVendorState.businessDetails, ...parsed.businessDetails },
      pricing: { ...defaultVendorState.pricing, ...parsed.pricing },
      documents: { ...defaultVendorState.documents, ...parsed.documents },
      bank: { ...defaultVendorState.bank, ...parsed.bank },
      analytics: { ...defaultVendorState.analytics, ...parsed.analytics }
    };
  } catch (error) {
    return defaultVendorState;
  }
};

export const saveVendorState = (state) => {
  if (typeof window === 'undefined') return;
  localStorage.setItem(STORAGE_KEY, JSON.stringify(state));
};

export const computeProfileCompletion = (state) => {
  const sections = [
    state.registration?.fullName,
    state.verification?.phoneVerified && state.verification?.emailVerified,
    state.businessDetails?.description,
    (state.services || []).length > 0,
    state.pricing?.range,
    (state.portfolio || []).length > 0,
    state.documents?.idProof && state.documents?.gst,
    state.bank?.accountNumber,
    state.subscription?.planId
  ];
  const completed = sections.filter(Boolean).length;
  return Math.round((completed / sections.length) * 100);
};

export const getListingStatusClass = (status) => {
  switch (status) {
    case 'Approved':
      return 'vendor-status-approved';
    case 'Pending':
      return 'vendor-status-pending';
    case 'Rejected':
      return 'vendor-status-rejected';
    case 'Suspended':
      return 'vendor-status-suspended';
    default:
      return 'vendor-status-draft';
  }
};
