import supabase from "./supabase";

const PENDING_PROFILE_KEY = "trimylink-pending-profile";

const loadPendingProfiles = () => {
  try {
    const raw = localStorage.getItem(PENDING_PROFILE_KEY);
    return raw ? JSON.parse(raw) : {};
  } catch (error) {
    return {};
  }
};

const savePendingProfile = (email, profile) => {
  const store = loadPendingProfiles();
  store[email] = profile;
  localStorage.setItem(PENDING_PROFILE_KEY, JSON.stringify(store));
};

const clearPendingProfile = (email) => {
  const store = loadPendingProfiles();
  delete store[email];
  localStorage.setItem(PENDING_PROFILE_KEY, JSON.stringify(store));
};

const getPendingProfile = (email) => {
  const store = loadPendingProfiles();
  return store[email] || null;
};

export async function login(formData) {
  const email = formData?.email;
  const password = formData?.password;

  const {data, error} = await supabase.auth.signInWithPassword({
    email,
    password,
  });

  if (error) throw error;

  const pending = getPendingProfile(email);
  if (pending && data?.user) {
    const {error: updateError} = await supabase.auth.updateUser({
      data: pending,
    });

    if (!updateError) {
      clearPendingProfile(email);
      const refreshed = await supabase.auth.getUser();
      return {user: refreshed?.data?.user || data.user};
    }
  }

  return {user: data.user};
}

export async function getCurrentUser() {
  const {data, error} = await supabase.auth.getUser();
  if (error) return null;
  return data.user;
}

export async function signup(formData) {
  const email = formData?.email;
  const password = formData?.password;
  const name = formData?.name;

  const {data, error} = await supabase.auth.signUp({
    email,
    password,
    options: {
      data: {name},
    },
  });

  if (error) throw error;

  let session = data?.session;
  let user = data?.user;

  // If signup didn't return a session, sign in to get one
  if (!session) {
    const {data: loginData, error: loginError} =
      await supabase.auth.signInWithPassword({email, password});

    if (loginError) {
      if (name || formData?.profile_pic) {
        savePendingProfile(email, {name});
      }
      return {user, profilePicUrl: null};
    }
    session = loginData.session;
    user = loginData.user;
  }



  // Now we have a valid session — upload profile pic
  let profilePicUrl = null;
  if (formData?.profile_pic && user?.id) {
    const fileExt = formData.profile_pic.name.split(".").pop();
    const filePath = `${user.id}/avatar-${Date.now()}.${fileExt}`;

    const {error: uploadError, data: uploadData} = await supabase.storage
      .from("profile_pic")
      .upload(filePath, formData.profile_pic, {upsert: true});

    if (uploadError) {
      console.warn("Profile pic upload failed:", uploadError.message);
      savePendingProfile(email, {name});
      return {user, profilePicUrl: null};
    }



    const {data: publicData} = supabase.storage
      .from("profile_pic")
      .getPublicUrl(filePath);

    profilePicUrl = publicData?.publicUrl || null;

    const {error: updateError} = await supabase.auth.updateUser({
      data: {name, profile_pic: profilePicUrl},
    });

    if (updateError) {
      savePendingProfile(email, {name, profile_pic: profilePicUrl});
    }
  } else {
    if (name) savePendingProfile(email, {name});
  }

  return {user, profilePicUrl};
}

export async function logout() {
  const {error} = await supabase.auth.signOut();
  if (error) throw error;
  return {success: true};
}
