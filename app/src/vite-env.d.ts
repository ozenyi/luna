/// <reference types="vite/client" />

interface LunaTestAccount {
  email: string;
  password: string;
}

interface Window {
  __LUNA_TEST_ACCOUNTS__?: {
    admin?: LunaTestAccount;
    voyant?: LunaTestAccount;
    client?: LunaTestAccount;
  };
}
